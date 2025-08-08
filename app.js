//primero levantar el servidor 
import express from "express"; 
import "dotenv/config" // para que se configure el dotenv 
import { startDb } from "./src/config/database.js";
import {User} from "./src/models/users.models.js";
import {Task} from "./src/models/tasks.models.js"


const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 
const startServer = async () => {
     await startDb(); 
     await User.sync(); 
     await Task.sync();
     console.log("Tablas creada");
     
}

app.get("/", (req, res) =>  {
  res.send ("server listo :p")

})

app.listen(PORT, async () => {
    await startDb();
  console.log(`El server está corriendo en:  http://localhost:${PORT}`);
});

startServer();