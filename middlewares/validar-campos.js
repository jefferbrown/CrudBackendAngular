const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    res.status(422).json({
      error: errores.mapped(),
      /* .mapped() te describe el titulo del error en el 
      json de retorno, encambio con el array() no te dice
       que campo es el vacio erroneo, te lo dice dentro 
       del array de obejtos */
    });
  } else next();
};

module.exports = {
  validarCampos,
};
