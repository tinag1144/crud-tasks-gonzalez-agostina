import { Roles } from "../models/roles_models.js";
import {User} from "../models/users.models.js"
import { Task } from "../models/tasks.models.js";

export const getAllUsers =  async (req, res) => {
    try {
         const users = await User.findAll({
      include: [
        {
          model: Task,
          as: "tasks",
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

export const getUserById = async (req, res) => {
    const id = Number(req.params.id);
    try{ 
        const user = await User.findByPk(id, {
          include: {
            model: Task,
            as: "tasks"
          }
        });
        if (!user ) return res.status(400).json({message: "No se encontró el usuario con el id ingresado"})
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error al buscar el usuario", error})
    }
};

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