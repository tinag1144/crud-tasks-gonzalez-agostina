//primero levantar el servidor 
import express from "express"; 
import "dotenv/config" // para que se configure el dotenv 
import { startDb } from "./src/config/database.js";


const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 

const startServer = async () => {
     await startDb(); 
     console.log("Tablas creadas");
     
}

app.get("/", (req, res) =>  {
  res.send ("server listo :p")

})

app.listen(PORT, async () => {
  console.log(`El server está corriendo en:  http://localhost:${PORT}`);
});

startServer();