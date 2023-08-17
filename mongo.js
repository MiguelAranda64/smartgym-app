const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Bryton:braiton123@sandbox.isoaps2.mongodb.net/smartgym")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.error(error);
  });

const newSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const usuarios = mongoose.model("usuarios", newSchema);

//logica administradores
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const administradores = mongoose.model("administradores", adminSchema);

module.exports = {
  usuarios,
  administradores,
};