var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { authHeader } = require("../middlewares/authenticated");

const {
  GetUsers,
  NewUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/users");

/* GET users listing. */
router.get("/", [authHeader], GetUsers);
router.post(
  "/new",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("El campo nombre no pueda estar vacio"),
    check("subname")
      .not()
      .isEmpty()
      .withMessage("El campo apellidos no pueda estar vacio"),
    check("password")
      .isLength({ min: 6, max: 12 })
      .withMessage("El password debe tener min 6 caracteres y menos de 12"),
    check("email").isEmail().withMessage("Correo no es valido"),
    validarCampos,
  ],
  NewUser
);
router.put("/:id", [authHeader], UpdateUser);
router.delete("/:id", [authHeader], DeleteUser);

module.exports = router;
