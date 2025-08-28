import { Roles } from "../models/roles_models.js";
import {User} from "../models/users.models.js"
import { Task } from "../models/tasks.models.js";
import { validationResult } from "express-validator";

//CRUD

//Create
export const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password ){
        return res.status(400).json({message: "Rellenar todos los campos es obligatorio"});
    };

    try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Ese mail ya está registrado" });

    const newUser = await User.create({ name, email, password});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear nuevo usuario", error });
  }
};

//Traer todos los usuarios 
export const getAllUsers =  async (req, res) => {
   const errors = validationResult(req)
              if (!errors.isEmpty()) 
                  return res
              .status(400)
              .json({message: errors.array()});

    try {
         const users = await User.findAll({
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: {exclude: ["createdAt", "updatedAt"]}
        },
        {
          model: Roles,
          through: { attributes: [] } 
        }
      ]
    });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error al traer todos los usuarios", error});
    }
    
};

//Traer usuarios por id
export const getUserById = async (req, res) => {
    const id = Number(req.params.id);
    try{ 
        const user = await User.findByPk(id, {
          include: {
            model: Task,
            as: "tasks",
            attributes: {exclude: ["createdAt", "updatedAt"]}
          }
        });
        if (!user ) return res.status(400).json({message: "No se encontró el usuario con el id ingresado"})
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error al buscar el usuario", error})
    }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {name, email, password} = req.body;

     if (!id || !name || !email || !password ){
        return res.status(400).json({message: "Rellenar todos los campos es obligatorio"});
    };

    try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Ese mail ya está registrado" });

    const newUser = await User.create({ id, name, email, password});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar nuevo usuario", error });
  }

};

//Eliminar usuario
export const deleteUser = async (req, res) =>{
    const { id } = req.params; 

  try {
    const user= await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    res.status(200).json({ message: "User eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }

}