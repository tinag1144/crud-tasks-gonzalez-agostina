import { Task } from "../models/tasks.models.js";
import { User } from "../models/users.models.js";



//CRUD

//Crear una task
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, author_id } = req.body;
    const task = await Task.create({ title, description, isComplete, author_id });
    res
    .status(201)
    .json({ message: "Tarea creada", task});
  } catch (error) {
    res
    .status(500)
    .json({ message: error.message });
  }
};

//Traer todas las taks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      //con esto podemos traer al usuario asociado usando la relación que ya se definio 
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name", "email"]  //y con esto se elife los campos que queremos ver del usuario
      }
    });
    res
    .status(200)
    .json(tasks);
  } catch (error) {
    res
    .status(500)
    .json({ message: error.message });
  }
};

//traer una task por su ID
export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id, {
      include: {
        model: User, 
        as: "author", 
        attributes: ["id", "name","email"]
      }
    });
    res
    .status(200)
    .json(task);
  } catch (error) {
    res
    .status(500)
    .json({ message: error.message });
  }
};

//actualizar una task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.update(req.body);
    res
    .status(200)
    .json(task);
  } catch (error) {
    res
    .status(500)
    .json({ message: error.message });
  }
};

//Eliminar una task 
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    res
    .status(204)
    .json({ message: "Se ha eliminado la tarea correctamente"});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
