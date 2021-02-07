const jwt = require("jsonwebtoken");

const authHeader = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const id = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  authHeader,
};
