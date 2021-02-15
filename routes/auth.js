var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { login, renewToken } = require("../controllers/auth");
const { authHeader } = require("../middlewares/authenticated");

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.get("/renew", [authHeader], renewToken);
module.exports = router;
