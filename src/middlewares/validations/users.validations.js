import { body, param } from "express-validator";
import { User } from "../../models/users.models.js";


// Validaciones para crear un usuario
export const createUserValidation = [
  body("name")
    .notEmpty().withMessage("El campo name es obligatorio")
    .isString().withMessage("El campo name debe ser un texto")
    .isLength({ min: 2, max: 50 }).withMessage("El name debe tener entre 2 y 50 caracteres"),

  body("email")
    .notEmpty().withMessage("El campo email es obligatorio")
    .isEmail().withMessage("El email debe ser válido")
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("El email ya está en uso");
      }
      return true;
    }),

  body("password")
    .notEmpty().withMessage("El campo password es obligatorio")
    .isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres"),
];

// Validaciones para actualizar un usuario
export const updateUserValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      return true;
    }),

  body("name")
    .optional()
    .isString().withMessage("El campo name debe ser un texto")
    .isLength({ min: 2, max: 50 }).withMessage("El name debe tener entre 2 y 50 caracteres"),

  body("email")
    .optional()
    .isEmail().withMessage("El email debe ser válido")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: value } });
      if (user && user.id !== parseInt(req.params.id)) { //acá se valida si el usuario existe y tabien si el usuario que encontrado NO sea el mismo que se está actualizando
        throw new Error("El email ya está en uso por otro usuario");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres"),
];

//validaciones para eliminar un usuario 
export const deleteUserValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) throw new Error("El usuario no existe");
    }),
];

//validacioes para traer los usuarios por id
export const getUserValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) throw new Error("El usuario no existe");
    }),
];
