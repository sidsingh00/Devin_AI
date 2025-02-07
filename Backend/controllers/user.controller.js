import userModel from '../models/user.model';
import * as userService from '../services/user.service';
import {validationResult} from 'express-validator'
import redisClient from '../services/redis.service';

export const createUserController = async(req,res)=>{

    const errors = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            error: error.array()
        });
    }

    try{
        const user = await userService.createUser(req.body);

        const token = await user.generateJWT();

        res.status(201).send({user,token});
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

export const loginController = async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            error:error.array()
        });
    }

    try{
        const {email,password} = req.body();

        const user = await userModel.findOne({email}).select('+password');

        if(!email){
            return res.status(400).json({
               error:'Invalid credentials' 
            })
        }

        const isMatch = await user.isValidPassword(password);

        if(!isMatch){
            return res.status(401).json({
                error: 'Invalid credentials'
            })
        }

        const token = await user.generateJWT();

        return res.status(201).json({
            message: 'User login'
        })
    }
    catch(error){
        return res.status(400).json({
            error: error.message
        })
    }

}

export const profileController = async(req,res)=>{
    console.log(req.user);

    res.status(200).json({
        user: req.user
    })
}

export const logoutController = async(req,res)=>{

    try{

        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        redisClient.set(token,'logout','EX',60*60*24);

        res.status(200).json({
            message: 'Logged out successfully'
        });
    }
    catch(error){
        return res.status(400).json({
            error: error.message
        })
    }

}