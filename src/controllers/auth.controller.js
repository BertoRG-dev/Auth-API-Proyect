const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

exports.signup = async (req, res) => {

    try {
        const { username, email, password, roles } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({ message: "Username, email, and password are required." });
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword
        });

        if (roles) {
            const rolesId = await Role.find({ name: { $in: roles } });
            newUser.roles = rolesId.map(role => role._id);
        } else {
            const defaultRole = await Role.findOne({ name: "user" });
            newUser.roles = [defaultRole._id];
        }


        await newUser.save();

        const location = req.protocol + '://' + req.get('host') + req.originalUrl + '/test/user';
        res.setHeader('Location', location);
        res.status(201).send({ message: "User was registered successfully!" });
        
    } catch (error) {
        res.status(500).send({ message: "An error occurred during sign-up." });
    }
};

exports.signin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    const user = await User.findOne({ username: username }).populate("roles", "-__v");
    if (!user) return res.status(404).json({ message: 'User not found' });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ accessToken: null, message: "Invalid Password!" });

    const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        expiresIn: 86400 
    });

    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());
    res.status(201).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });

};