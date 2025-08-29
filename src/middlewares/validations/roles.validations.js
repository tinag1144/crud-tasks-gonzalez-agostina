import { body, param } from "express-validator";
import { Roles } from "../../models/roles_models.js";

//validaciones para crear un rol 
export const createRolValidation = [
    body("name")
    .isEmpty().withMessage("El nombre no puede estar vacío")
    .custom( async (value) => {
        const name = await Roles.findOne({ where: { name: value} });
        if (name) {
            throw new Error("El rol que quiere ingresar ya existe");
        } 
        return true
    })
];

//traer roles por id 
export const getRolValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const rol = await Roles.findByPk(value);
      if (!rol) throw new Error("El rol no existe");
    }),
];

//validaciones para actualizar el rol
export const updateRolValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const rol = await Roles.findByPk(value);
      if (!rol) {
        throw new Error("El rol no existe");
      }
      return true;
    }),

    body("name")
    .isEmpty().withMessage("El nombre no puede estar vacío")
    .custom( async (value) => {
        const name = await Roles.findOne({ where: { name: value} });
        if (name) {
            throw new Error("El rol que quiere ingresar ya existe");
        } 
        return true
    })

];

//validaciones para eliminar un rol 
export const deleteRolValidation = [

    param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
        const rol = await Roles.findByPk(value);
      if (!rol) throw new Error("El rol no existe");
    }),

];
