import userModel from '../models/user.model.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ObjectId } from 'mongoose'; 

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createUserService = async ({ username, email, password, mobileNumber }, file) => {
    if (!email || !password || !username || !mobileNumber) {
        throw new Error('All fields are required.');
    }

    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error('Email is already registered.');
    }

    const hashedPassword = await userModel.hashPassword(password);

    
    let profilePictureUrl = null;
    if (file) {
        const uploadedImage = await cloudinary.v2.uploader.upload(file.path, {
            folder: 'user_profiles',
        });
        profilePictureUrl = uploadedImage.secure_url;
    }

    
    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        mobileNumber,
        profilePicture: profilePictureUrl,
    });

    return newUser;
};


export const getAllUsers = async () => {
    return await userModel.find({});
};



export const getUserById = async (id) => {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
    }

    return await userModel.findById(id);
};


export const updateUser = async (id, updateData) => {
    const user = await userModel.findById(id);

    if (!user) {
        return null;  
    }


    Object.assign(user, updateData);
    await user.save();

    return user;
};

export const deleteUser = async (id) => {
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
        return null;  
    }

    return user;
};