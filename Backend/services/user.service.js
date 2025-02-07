import userModel from '../models/user.model';

export const createUser = async({
    email,password
}) =>{
    if(!email || !password){
        throw new Error('Email and password are required');
    }

    const hashedPassword = await userModel.hashedPassword(password);

    const user = await userModel.create({
        email,
        password : hashedPassword
    });

    return user;
}