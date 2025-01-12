import express from 'express';
import morgan from 'morgan';
import connect from './Database/db.js';
import userRoutes from './routes/user.route.js';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'User Management API',
        version: '1.0.0',
        description: 'API for managing users',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
};


const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User routes
app.use('/api/users', userRoutes);

export default app;
