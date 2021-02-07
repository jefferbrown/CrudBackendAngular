var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  GetMovies,
  NewMovie,
  UpdateMovie,
  DeleteMovie,
} = require("../controllers/movies");

/* GET users listing. */
router.get("/", GetMovies);
router.post(
  "/new",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("El campo nombre no pueda estar vacio"),
    check("sinopsis")
      .not()
      .isEmpty()
      .withMessage("El campo apellidos no pueda estar vacio"),
    check("directors")
      .not()
      .isEmpty()
      .withMessage("El campo nombre no pueda estar vacio"),
    check("reparto")
      .not()
      .isEmpty()
      .withMessage("El campo apellidos no pueda estar vacio"),
    check("genero")
      .not()
      .isEmpty()
      .withMessage("El campo apellidos no pueda estar vacio"),
    validarCampos,
  ],
  NewMovie
);
router.put("/:id", UpdateMovie);
router.delete("/:id", DeleteMovie);

module.exports = router;
