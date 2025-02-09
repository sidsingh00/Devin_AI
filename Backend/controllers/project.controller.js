import { validationResult } from "express-validator";
import projectModel from "../models/project.model";
import * as projectService from '../services/project.service'
import userModel from '../models/user.model,js'

export const createProject = async(req,res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try{
        const {name} = req.body;
        const loggedInUser = await userModel.findOne({email});

        const userId = loggedInUser._id;

        const newProject = await projectService.createProject({name,userId})

        res.status(201).json(newProject);
    }
    catch(error){
        console.log(error);
    }
}


export const getAllProject = async(req,res)=>{
    try{
        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const allUserProjects = await projectService.getAllProjectByUserId({
            userId: loggedInUser._id
        })

        return res.status(200).json({
            projects:allUserProjects
        })
    }
    catch(err){
       console.log(err)
       res.status(400).json({
        err: err.message
       }) 
    }
}


export const addUserToProject = async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }

    try{
        const {projectId, users} = req.body

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const project = await projectService.addUserToProject({
            projectId,
            users,
            userId : loggedInUser._id
        })
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            error:err.message
        })
    }

}


export const getAllProjectByUserId = async(req,res)=>{

    const {projectId} = req.params;

    try{
        const project = await projectService.getAllProjectById({
            projectId
        });

        return res.status(200).json({
            project
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({error:err.message})
    }

}