import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name:{
        type : String,
        lowercase : true,
        required : true,
        trim : true,
    }
})