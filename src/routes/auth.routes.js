const express = require('express');
const router = express.Router();

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
    );
    next();
});

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *      tags:
 *       - Authorization
 *      description: Register into the database 
 *      responses:
 *          201:
 *              description: Success    
 */
router.post("/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup);

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *      tags:
 *       - Authorization
 *      description: Login 
 *      responses:
 *          201:
 *              description: Success    
 */
router.post("/auth/signin", controller.signin);


module.exports = router;