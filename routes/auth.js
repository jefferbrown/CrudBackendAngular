var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { Login } = require("../controllers/auth");

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  Login
);

module.exports = router;
