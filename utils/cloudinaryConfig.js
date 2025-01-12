import cloudinary from 'cloudinary';
import { userModel } from '../models/user.model.js';


cloudinary.config({
    cloud_name: 'your-cloud-name',
    api_key: 'your-api-key',
    api_secret: 'your-api-secret',
});


export const createUserController = async (req, res) => {
    try {
        const { username, email, password, mobileNumber } = req.body;
        const profilePicture = req.file; 

        if (!username || !email || !password || !mobileNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let profilePictureUrl = '';
        if (profilePicture) {
        
            const result = await cloudinary.v2.uploader.upload(profilePicture.path);
            profilePictureUrl = result.secure_url; 
        }

    
        const newUser = new userModel({
            username,
            email,
            password,
            mobileNumber,
            profilePicture: profilePictureUrl,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};
