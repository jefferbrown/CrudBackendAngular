const User = require("../models/user");
const bcrypt = require("bcryptjs");

const GetUsers = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  console.log(desde);
  /* User.find().then((users) => {
    if (!users) {
      res.status(404).send({ message: "No hay usuarios" });
    } else {
      res.status(200).send({ users });
    }
  }); */

  const [usuarios, total] = await Promise.all([
    User.find({}, "name subname email img").skip(desde).limit(2),

    User.countDocuments(),
  ]);

  res.json({
    ok: true,
    usuarios,
    total,
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
        message: "Usuario creado correctamente",
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

  try {
    const usuarioDB = await User.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  GetUsers,
  NewUser,
  UpdateUser,
  DeleteUser,
};
