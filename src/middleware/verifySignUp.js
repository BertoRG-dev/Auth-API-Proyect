const { trusted } = require("mongoose");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const newUsername = req.body.username;
        const newEmail = req.body.email;

        const duplicateUser = await User.findOne({ username: newUsername });
        if (duplicateUser) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        duplicateUser = await User.findOne({ email: newEmail });
        if (duplicateUser) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        next();
    } catch (error) {
        res.status(500).send({ message: error });
        return;
    }
};

checkRolesExisted = (req, res, next) => {
    try {
        const newRoles = req.body.roles

        newRoles.forEach(role => {
            if (!ROLES.includes(role)) {
                res.status(400).send({ message: `Failed! Role ${role} does not exist!`});
                return;
            }
        });
        next();
    } catch (error) {
        res.status(500).send({ message: error });
        return;
    }
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };
  
  module.exports = verifySignUp;