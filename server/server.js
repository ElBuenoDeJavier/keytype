import express from "express"; //importo el framework para crear servidores
import cors from "cors";    // middleware que permite solicitudes desde otros dominios
import usuarios from "./routes/usuario.js"; // se importa el modulo usuario.js
import puntuacion from "./routes/puntuacion.js";
import cookieParser from "cookie-parser";
//Puerto en el que correra el servidor
const PORT = process.env.PORT || 5050;
const app = express(); //Inicializacion de express

//middlewares

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
})); // habilita cors para permitir peticiones desde fuera
app.use(express.json()); // permite el procesamiento json en las solicitudes
app.use(cookieParser()); //permite el uso de cookies
app.use("/usuario", usuarios); // definicion de ruta
app.use("/puntuacion", puntuacion);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});