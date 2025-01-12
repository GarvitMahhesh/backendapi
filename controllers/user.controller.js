import { validationResult } from 'express-validator';
import { createUserService, getAllUsers, getUserById, updateUser, deleteUser } from '../services/user.service.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import cloudinary from 'cloudinary';
import userModel from '../models/user.model.js'
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createUserController = async (req, res) => {
    try {
        const { username, email, password, mobileNumber } = req.body;
        const profilePicture = req.file; 

        
        const newUser = await createUserService(
            { username, email, password, mobileNumber }, 
            profilePicture 
        );


        const token = newUser.generateJwt();

        
        return res.status(201).json({
            message: 'User created successfully',
            user: newUser,
            token: token, 
        });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};


export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error in getAllUsersController:", error.message);
        return res.status(500).json({ error: error.message });
    }
};


export const getUserByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error in getUserByIdController:", error.message);
        return res.status(500).json({ error: error.message });
    }
};



export const updateUserController = async (req, res) => {
    const { id } = req.params;  

    try {
        const updatedUser = await updateUser(id, req.body);  

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error("Error in updateUserController:", error.message);
        return res.status(500).json({ error: error.message });
    }
};


export const deleteUserController = async (req, res) => {
    const { id } = req.params;  
    try {
        const deletedUser = await deleteUser(id);  

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error("Error in deleteUserController:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
