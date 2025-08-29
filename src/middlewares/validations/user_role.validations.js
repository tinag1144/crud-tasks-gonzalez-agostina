import { param } from "express-validator";
import { user_roles } from "../../models/user_role_models.js";

export const getUserRoleValidation = [
   param("id")
       .isInt().withMessage("El id debe ser un número entero")
       .custom(async (value) => {
         const user_role = await user_roles.findByPk(value);
         if (!user_role) throw new Error("El usuario no existe");
       }),
]