import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, 
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: null,
        required: true,
    },
});


userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Instance method to generate a JWT
userSchema.methods.generateJwt = function () {
    return jwt.sign({ email: this.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

const User = mongoose.model('User', userSchema);

export default User;
