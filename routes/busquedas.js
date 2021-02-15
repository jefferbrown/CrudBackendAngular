/*

    ruta: api/todo/
*/
const { Router } = require("express");
const { authHeader } = require("../middlewares/authenticated");

const { getTodo, getDocumentosColeccion } = require("../controllers/busquedas");

const router = Router();

router.get("/:busqueda", authHeader, getTodo);

router.get("/coleccion/:tabla/:busqueda", authHeader, getDocumentosColeccion);

module.exports = router;
