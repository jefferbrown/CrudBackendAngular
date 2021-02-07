const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = (req, res) => {
  const { email, password } = req.body;
  console.log(email + password);
  User.findOne({ email }, (err, userExist) => {
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
        const payload = {
          id: userExist._id,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "12h",
        });

        res.json({
          ok: true,
          message: "Login correcto",
          token,
        });
      }
    }
  });
};

module.exports = {
  Login,
};
