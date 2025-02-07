import cookieParser from 'cookie-parser';
// import { cookie } from 'express-validator';
import jwt from 'jsonwebtoken'
import redisClient from '../services/redis.service';

export const authUser = async(req,res)=>{
    try{
        const token = req.cookie.token ||req.header('Authorization').replace('Bearer','');

        if(!token){
            return res.status(400).json({
                error: 'the token is not found',
            });
        }

        const isBlackListed = await redisClient.get(token);

        if(isBlackListed){
            return res.status(401).send({
                error: error.message
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401).send({
            error:'Please authenticate'
        });
    }
}