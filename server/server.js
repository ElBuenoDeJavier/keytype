import express from "express"; //importo el framework para crear servidores
import cors from "cors";    // middleware que permite solicitudes desde otros dominios
import usuarios from "./routes/usuario.js"; // se importa el modulo usuario.js
//Puerto en el que correra el servidor
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/usuario", usuarios);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});