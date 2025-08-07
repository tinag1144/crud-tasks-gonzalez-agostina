//primero levantar el servidor 
import express from "express"; 
import "dotenv/config" // para que se configure el dotenv 

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 

app.get("/", (req, res) =>  {
  res.send ("server listo :p")

})

app.listen(PORT, async () => {
   
  console.log(`El server está corriendo en:  http://localhost:${PORT}`);
});