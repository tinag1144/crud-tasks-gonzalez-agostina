import express from "express"; 
import "dotenv/config" 
import tasksRoutes from "./src/routes/tasks.routes.js";
import usersRoutes from "./src/routes/users.routes.js";
import rolsRoutes from "./src/routes/roles.routes.js";
import documentRoutes from "./src/routes/documento.routes.js";
import { startDb } from "./src/config/database.js";


const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 

app.use("/api", tasksRoutes);
app.use("/api", usersRoutes);

//rutas nuevas
app.use("/api", rolsRoutes);
app.use("/api", documentRoutes);

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