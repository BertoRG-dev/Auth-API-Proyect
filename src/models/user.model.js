const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [{
        type: ObjectId,
        ref: "Role",
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;