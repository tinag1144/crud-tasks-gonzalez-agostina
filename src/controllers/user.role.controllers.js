import { user_roles } from "../models/user_role_models.js";


//CRUD

//crear
export const assignRole = async (req, res) => {
  const { user_id, role_id } = req.body;
  try {
    const userRole = await user_roles.create({ user_id, role_id });
    res
    .json(userRole);

  } catch (err) {
    res
    .status(500)
    .json({ error: err.message });
  }
};

//traer todos 
export const getUserRoles = async (req, res) => {
  try {
          const rols = await user_roles.findAll();
      res
      .status(200)
      .json(rols);
    } catch (error) {
      res
      .status(500)
      .json({ msg: "Error al traer los usuarios y roles", error });
    }
};

//traer por id 
export const getRolsById = async (req, res) => {
    const id = Number(req.params.id);
    try {
            const rols = await user_roles.findByPk(req.params.id);
            res
            .json(rols)
        } catch (error) {
            res
            .status(500)
            .json({ messsage: "Error al buscar ese id"});
        }
};