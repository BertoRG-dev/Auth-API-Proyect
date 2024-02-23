const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).send({ message: "No authorization header provided!" });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        return res.status(401).send({ message: "Invalid authorization header format!" });
    }

    const token = parts[1];
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });

};

isAdmin = async (req, res, next) => {
    const userId = req.userId;

    const user = await User.findById(userId)
    if (!user) {
        res.status(500).send({ message: err });
        return;
    }

    const roles = await Role.find({ _id: { $in: user.roles } });
    if (!roles || roles.length === 0) {
        return res.status(403).send({ message: "User has no roles assigned" });
    }

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

    res.status(403).send({ message: "Require Admin Role!" });
    return;

};

const authJwt = {
    verifyToken,
    isAdmin
};
module.exports = authJwt;