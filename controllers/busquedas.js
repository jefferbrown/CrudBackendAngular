const User = require("../models/user");
const Movie = require("../models/movie");

const getTodo = async (req, res) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, movies] = await Promise.all([
    User.find({ name: regex }),
    Movie.find({ mame: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    movies,
  });
};

const getDocumentosColeccion = async (req, res) => {
  console.log(req.params);
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  console.log(regex);
  let data = [];

  switch (tabla) {
    case "users":
      data = await User.find({ name: regex });
      console.log(data);
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios/movies",
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
