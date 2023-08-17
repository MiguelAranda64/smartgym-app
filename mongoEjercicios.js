const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Bryton:braiton123@sandbox.isoaps2.mongodb.net/smartgym")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.error(error);
  });

const ejercicioSchema = new mongoose.Schema({
  parte_cuerpo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  steps: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const ejercicios = mongoose.model("ejercicios", ejercicioSchema);

module.exports = ejercicios;

