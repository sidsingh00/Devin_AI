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