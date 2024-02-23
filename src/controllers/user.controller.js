const { trusted } = require("mongoose");
const db = require("../models");
const User = db.user;
const Role = db.role;

const UserController = {
    allAccess: (req, res) => {
        res.status(200).send("Public Content.");
    },
    userBoard: (req, res) => {
        res.status(200).send("User Content.");
    },
    adminBoard: async (req, res) => {
        try {
            const users = await User.find().populate("roles", "-__v");;

            const parsedUsers = users.map(user => {
                return {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    roles: user.roles.map(role => "ROLE_" + role.name.toUpperCase())
                }
            });

            res.status(200).json(parsedUsers);

        } catch (error) {
            res.status(500).json({ error: 'Error retrieving users' });
        }
    }
}

module.exports = UserController;