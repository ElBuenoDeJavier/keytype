import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /puntuacion
const router = express.Router();

// Guardar estadísticas
router.post("/add", async (req, res) => {
  try {

    let guardarEstadisticas = {
      name: req.body.dataUsuario.name,
      aciertos: req.body.aciertos,
      errores: req.body.errores,
      escritos: req.body.escritos,
    };
    if(req.body.dataUsuario.name != ''){
        let result = await collection.insertOne(guardarEstadisticas);
        res.status(200).send({ message: 'Estadísticas guardadas exitosamente', result });
    }else{
        return res.status(401).send({message:"No se ha iniciado sesión"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({message: "Error guardando estadísticas"});
  }
});

export default router;
