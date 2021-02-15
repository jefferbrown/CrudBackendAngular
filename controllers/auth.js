const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generateJwt");

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email + password);
  User.findOne({ email }, async (err, userExist) => {
    if (err) {
      console.log(err);
    } else if (!userExist) {
      res.json({
        ok: false,
        message: "El usuario no esta registrado",
      });
    } else if (userExist) {
      console.log(userExist);
      const validPassword = bcrypt.compareSync(password, userExist.password);
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Contraseña no válida",
        });
      } else {
        // Generar el TOKEN - JWT
        const token = await generarJWT(userExist._id);

        res.json({
          ok: true,
          message: "Login correcto",
          token,
        });
      }
    }
  });
};

const renewToken = async (req, res) => {
  const uid = req.userId;

  // Generar el TOKEN - JWT
  const token = await generarJWT(uid);

  // Obtener el usuario por UID
  const usuario = await User.findById(uid);

  res.json({
    ok: true,
    token,
    usuario,
  });
};

module.exports = {
  login,
  renewToken,
};
