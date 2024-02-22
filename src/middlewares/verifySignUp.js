const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const newUsername = req.body.username;
        const newEmail = req.body.email;

        const existingUsername = await User.findOne({ username: newUsername });
        if (existingUsername) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        const existingEmail  = await User.findOne({ email: newEmail });
        if (existingEmail) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        next();
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
};

checkRolesExisted = (req, res, next) => {
    try {
        const newRoles = req.body.roles
        if (newRoles) {
            for (let i = 0; i < newRoles.length; i++) {
                if (!ROLES.includes(newRoles[i])) {
                    res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!`});
                    return;
                }
              }
        }
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