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

router.post("/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup);

router.post("/auth/signin", controller.signin);


module.exports = router;