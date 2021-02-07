const { Schema, model } = require("mongoose");

const MovieSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  sinopsis: {
    type: String,
    require: true,
  },
  directors: {
    type: String,
    require: true,
  },
  reparto: {
    type: String,
    require: true,
  },
  genero: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  banner: {
    type: String,
  },
});

module.exports = model("Movie", MovieSchema);
