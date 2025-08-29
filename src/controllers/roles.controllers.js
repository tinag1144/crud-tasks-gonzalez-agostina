import { Roles } from "../models/roles_models.js";
import { User } from "../models/users.models.js";

//CRUD 

//Crear un rol
export const createRol = async (req, res) => {
    try {
         const { name } = req.body;
        const role = await Roles.create({ name });
        res
        .status(201)
        .json(role);

    } catch (error) {
        res.status(500).json({ message: "error al crear un nuevo rol", error })
    }
}

//Traer todods los roles 
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll({ 
        include: { model: User, 
        through: { 
            attributes: [] //esto es para que no se incluyan los atributos de la tabla intermedia al hacer un include (da un resultado mas limpio)
         } 
    } 
});
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ msg: "Error al traer roles", error });
  }
};

//Traer los roles por ID
export const getRolById = async (req, res) => {
     try {
            const rol = await Roles.findByPk(req.params.id);
            res
            .json(rol)
        } catch (error) {
            res
            .status(500)
            .json({ messsage: "Error al buscar el rol deseado"});
        }
};

//Actualizar rol
export const updateRol = async (req, res) => {
        const { name } = req.body;
    
        try{
            const rol = await Roles.findByPk(req.params.id)
            await rol.update({
                name
            });
    
            res
            .json(rol);
        } catch (error) {
            res
            .status(500)
            .json({message: "Error al actualizar los datos del rol"})
        }
};
    
//Eliminar un rol 
export const deleteRol = async (req, res) => {
    try {
        const rol = await Roles.findByPk(req.params.id);
        await rol.destroy() 
        res
        .json({ message: "Se eliminó el rol correctamente" })
    } catch (error) {
        res
        .status(500)
        .json({ message: "Hubo un error al intentar borrar el rol", error })
    }
}