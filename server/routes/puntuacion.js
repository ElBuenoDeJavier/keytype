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
    if(req.body.dataUsuario.name != null){
      //Insertar estadísticas en la base de datos
        let collection = await db.collection("puntuaciones");
        let result = await collection.insertOne(guardarEstadisticas);
        res.status(200).send({ message: 'Estadísticas guardadas exitosamente', result });
    }else{
        return res.status(401).send({message:"Inicia sesión para guardar tus estadísticas"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({message: "Error guardando estadísticas"});
  }
});

//GET
router.get("/", async (req, res) => {
  let collection = await db.collection("puntuaciones");
  //devuelve un array de objetos
  let results = await collection.find({}).toArray();
  res.send(results);
});

//GET POR NOMBRE
router.get("/name=:name", async (req, res) => {
  let collection = await db.collection("puntuaciones");
  //devuelve un array de objetos
  let results
  try{
    results = await collection.find({name: req.params.name}).toArray();
    res.send(results);
  }catch(err){
    res.status(404).send({message: "Usuario no encontrado"});
  }
}
);

export default router;
