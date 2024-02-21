require('dotenv').config()
const express = require("express");
const cors = require("cors");
const db = require("./src/db");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connectDB()
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    db.initializeRoles();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});