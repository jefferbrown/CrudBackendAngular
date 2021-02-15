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
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = uid;
	 
    next();
  } catch (error) {
console.log(error)
    return res.status(401).json({
      ok: false,
      msg: "Token no válido o ha expirado",
    });
  }
};

module.exports = {
  authHeader,
};
