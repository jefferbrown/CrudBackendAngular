const User = require("../models/user");
const bcrypt = require("bcryptjs");

const GetUsers = async (req, res) => {
  console.log(req);
  User.find().then((users) => {
    if (!users) {
      res.status(404).send({ message: "No hay usuarios" });
    } else {
      res.status(200).send({ users });
    }
  });
};

const NewUser = (req, res) => {
  const { password } = req.body;

  const userAdd = new User(req.body);

  /*     Encriptar el password */
  const salt = bcrypt.genSaltSync(10);
  userAdd.password = bcrypt.hashSync(password, salt);

  /* user.email = email.toLowerCase(); */
  userAdd.save((err, userNew) => {
    if (err) {
      res.status(500).json({
        ok: true,
        message: "El correo ya existe en la base de datos",
      });
    } else {
      res.status(200).json({
        ok: true,
        userNew,
      });
    }
  });
};
const UpdateUser = async (req, res, next) => {
  const uid = req.params.id;

  User.findByIdAndUpdate(
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
            .send({ message: "No se ha encontrado ningun usuario" });
        } else {
          res.status(200).send(data);
        }
      }
    }
  );
};

const DeleteUser = async (req, res) => {
  const uid = req.params.id;
  User.findOneAndRemove({ _id: uid }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        ok: true,
        message: err,
      });
    } else {
      if (!data) {
        res.status(404).send({ message: "No se ha encontrado ningun usuario" });
      } else {
        res.status(200).send("Usuario eliminado");
      }
    }
  });
};

module.exports = {
  GetUsers,
  NewUser,
  UpdateUser,
  DeleteUser,
};
