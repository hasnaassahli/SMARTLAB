require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://hasnaassahli2:6QGLgC2o5gfYDN4A@cluster0.ljn1vxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  JWT_SECRET: process.env.JWT_SECRET || "secretkey",
};
