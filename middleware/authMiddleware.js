import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
    
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }


        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;


        next();

    } catch (error) {
        console.error("Error verifying token:", error.message);

    
        res.status(401).json({ message: 'Token is not valid or expired' });
    }
};
