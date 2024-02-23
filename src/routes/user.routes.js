const express = require('express');
const router = express.Router();

const { authJwt } = require("../middlewares");
const UserController = require("../controllers/user.controller");

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
    );
    next();
});

/**
 * @swagger
 * /api/test/all:
 *  get:
 *      tags:
 *       - Content
 *      description: Register into the database 
 *      responses:
 *          201:
 *              description: Success    
 */
router.get("/test/all", UserController.allAccess);


/**
 * @swagger
 * /api/test/user:
 *  get:
 *      tags:
 *       - Content
 *      security:
 *       - BearerAuth: []
 *      description: Register into the database 
 *      responses:
 *          201:
 *              description: Success    
 */
router.get("/test/user", [authJwt.verifyToken], UserController.userBoard);

/**
 * @swagger
 * /api/test/admin:
 *  get:
 *      tags:
 *       - Content
 *      security:
 *       - BearerAuth: []
 *      description: Register into the database 
 *      responses:
 *          201:
 *              description: Success    
 */
router.get("/test/admin", [authJwt.verifyToken, authJwt.isAdmin], UserController.adminBoard);

module.exports = router;