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

router.get("/test/all", UserController.allAccess);

router.get("/test/user", [authJwt.verifyToken], UserController.userBoard);
router.get("/test/admin", [authJwt.verifyToken, authJwt.isAdmin], UserController.adminBoard);

module.exports = router;