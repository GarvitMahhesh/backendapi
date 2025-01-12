# Backend API Documentation

## Overview

This project provides a RESTful backend API for **[Your Project Name]**, offering essential features such as user management, authentication, and more. The API is built using Node.js, Express, MongoDB, and integrates Cloudinary for image storage.

## Features
- User Registration and Authentication
- Profile Picture Upload via Cloudinary
- CRUD Operations for Users

## API Endpoints

### 1. **POST /api/users/create**
- **Description:** Create a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "mobileNumber": "string",
    "profilePicture": "file"
  }

GET /api/users/all
Description: Get all users.
Response:
json
Copy code
{
  "users": [
    {
      "username": "string",
      "email": "string",
      "profilePicture": "string"
    }
  ]
}
GET /api/users/{id}
Description: Get a user by ID.
Parameters:
id: The ID of the user to fetch.
Response:
json
Copy code
{
  "user": {
    "username": "string",
    "email": "string",
    "profilePicture": "string"
  }
}
PUT /api/users/update/{id}
Description: Update a user by ID.
Parameters:
id: The ID of the user to update.
Request Body:
json
Copy code
{
  "username": "string",
  "email": "string",
  "mobileNumber": "string",
  "profilePicture": "string"
}
DELETE /api/users/delete/{id}
Description: Delete a user by ID.
Parameters:
id: The ID of the user to delete.
Response:
json
Copy code
{
  "message": "User deleted successfully"
}

Live Demo
You can test the live API at the following link:  https://backendapi-1bda.onrender.com/api-docs/

Conclusion
This concludes the documentation for the Backend API. Please feel free to explore the endpoints, and let me know if you have any questions or require further assistance.




How to Run the Project Locally
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo-link.git
Install dependencies:

bash
Copy code
npm install
Create a .env file with the necessary environment variables:

makefile
Copy code
SECRET_KEY=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
MONGO_URI=your-mongodb-uri
Run the server:

bash
Copy code
npm start
The server will be running on http://localhost:3000.

Technologies Used
Node.js
Express.js
MongoDB
Cloudinary
JWT (JSON Web Tokens)
Postman (for testing)

