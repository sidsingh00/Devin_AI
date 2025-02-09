import mongoose from "mongoose";
import projectModel from "../models/project.model";

export const createProject = async(
    name,userId
)=>{
    
    if(!name){
        throw new Error('Name is required')
    }
    if(!userId){
        throw new Error('User is required')
    }

    let project;
    try{
        project = await projectModel.create({
            name,
            users: [userId]
        });
    }
    catch(error){
        if(error.code === 11000){
            throw new Error('Project name already exists')
        }
        throw error;
    }

    return project;
}

export const getAllProjectByUserId = async({userId})=>{
    if(!user){
        throw new('UserId is there')
    }

    const allUserProjects = await projectModel.find({
        users: userId
    })

    return allUserProjects

}


export const addUserToProject = async({ projectId, users, userId })=>{
   
    if(!projectId){
        throw new Error("projectId is required")
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projected")
    }

    if(!users){
        throw new Error("users are required")
    }
    
    if(!userId){
        throw new Error("usersId are required")
    }
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("Invalid userId");
    }

    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error("Invalid userId(s) in users array")
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })

    if(!project){
        throw new Error("User not belong to this project")
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id:project
    },{
        $addToSet:{
            users:{
                $each:users
            }
        }
    },{
        new: true
    })

    return updatedProject

}

export const getAllProjectById = async({projectId})=>{

    if(!projectId){
        throw new Error("projectId is required")
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId")
    }

    const project = await projectModel.findOne({
        _id: projectId
    }).populate('users')

    return project;

}