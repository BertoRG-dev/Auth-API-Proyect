require('dotenv').config()
const express = require("express");
const cors = require("cors");
const db = require("./src/db");
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();



var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', userRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'Ath-Api Proyect',
      version: '1.0.0',
      description: ' The Secure Authentication System with JWT Tokens API provides endpoints for user authentication using JSON Web Tokens (JWT).'
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your server URL
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        // Define your schemas here
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Operations about user login and register'
      },
      {
        name: 'Content',
        description: 'Operations about showing content'
      }
    ]
  },
  apis: ['./src/routes/*.js'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))




db.connectDB()
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    db.initializeRoles();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});