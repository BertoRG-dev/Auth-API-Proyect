const dbConfig = require("./config/db.config");
const db = require("./models");
const Role = db.role;

const mongoose = db.mongoose;

exports.connectDB = () => {
  return mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);
};

exports.initializeRoles = async () => {
    try {
      const count = await Role.estimatedDocumentCount();
      if (count === 0) {
        await Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "admin" }).save()
        ]);
        console.log("Roles initialized successfully.");
      }
    } catch (err) {
      console.error("Error initializing roles:", err);
    }
  };
