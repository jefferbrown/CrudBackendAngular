const Movie = require("../models/movie");

const GetMovies = async (req, res) => {
  Movie.find().then((movies) => {
    if (!movies) {
      res.status(404).send({ message: "No hay Peliculas" });
    } else {
      res.status(200).send({ movies });
    }
  });
};

const NewMovie = (req, res) => {
  const movieAdd = new Movie(req.body);

  movieAdd.save((err, movieNew) => {
    if (err) {
      res.status(500).json({
        ok: true,
        message: "Error" + err,
      });
    } else {
      res.status(200).json({
        ok: true,
        movieNew,
      });
    }
  });
};
const UpdateMovie = async (req, res, next) => {
  const uid = req.params.id;

  Movie.findByIdAndUpdate(
    { _id: uid },
    req.body,
    {
      new: true,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          ok: true,
          message: err,
        });
      } else {
        if (!data) {
          res
            .status(404)
            .send({ message: "No se ha encontrado ningun pelicula" });
        } else {
          res.status(200).send(data);
        }
      }
    }
  );
};

const DeleteMovie = async (req, res) => {
  const uid = req.params.id;
  Movie.findOneAndRemove({ _id: uid }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        ok: true,
        message: err,
      });
    } else {
      if (!data) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun Pelicula" });
      } else {
        res.status(200).send("Pelicula eliminado");
      }
    }
  });
};

module.exports = {
  GetMovies,
  NewMovie,
  UpdateMovie,
  DeleteMovie,
};
