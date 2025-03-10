import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /usuario.
const router = express.Router();

// LISTA DE USUARIOS CON GET
router.get("/", async (req, res) => {
  let collection = await db.collection("usuarios");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// REGISTRAR USUARIO.
router.post("/register", async (req, res) => {
  try {

    
    let nuevoUsuario = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    let collection = await db.collection("usuarios");
    let user = await collection.findOne({email: req.body.email});
    // COMPROBAR QUE NO EXISTE UN USUARIO CON EL MISMO CORREO
    if(!user){
        let result = await collection.insertOne(nuevoUsuario);
        res.send(result).status(204);
    }else{
        return res.status(401).send({message:"Ya existe un usuario con este correo"});
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding usuario");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        //Hago un get de la base de datos 
        // Buscar el usuario en la base de datos por correo electrónico
        let collection = await db.collection("usuarios");
        let user = await collection.findOne({email: req.body.email});
    
        // El usuario existe y si la contraseña es correcta
        if (!user) {
            //codigo 404 not found, que no se ha encontrado el usuario
          return res.status(404).send({message: "Usuario no encontrado"});
        }
        // Comparar la contraseña 
        if (user.password !== req.body.password) {
            //devuelve el codigo 401 que es no autorizado y el mensaje
          return res.status(401).send({message:"Contraseña incorrecta"});
        }
        //NO HA FALLADO NINGUNA COMPROBACION ENTONCES EXISTE Y ES CORRECTO
        // SE LE DEVUELVE AL CLIENTE UN MENSAJE DE CORRECTO Y EL USUARIO
        res.status(200).send({ message: "Inicio de sesión correcto", user });
    
      } catch (err) {
        console.error(err);
        //ERROR del servidor 
        res.status(500).send({message: "Error al iniciar sesión"});
      }
  });

// This section will help you delete a usuario
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("usuarios");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting usuario");
  }
});

export default router;