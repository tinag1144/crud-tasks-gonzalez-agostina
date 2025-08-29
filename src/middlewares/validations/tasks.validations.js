import { body, param } from "express-validator";
import { Task } from "../../models/tasks.models.js";
import { User } from "../../models/users.models.js";

//validaciones para crear una task
export const createTaskValidation = [
    body("title")
    .notEmpty().withMessage("El campo title es obligatorio")
    .isLength({min: 5, max: 40}).withMessage("El title debe tener entre 5 y 40 caracteres"),

    body("description")
    .notEmpty().withMessage("El campo description no debe estar vacío")
    .isLength({min: 10, max: 100}).withMessage("El title debe tener entre 10 y 100 caracteres"),

    body("author_id")
    .custom(async (value) => {
          const user = await User.findOne({ where: { author_id: value } });
          if (!user) {
            throw new Error("El usuario al que se le quiere asignar la tarea no existe");
          }
          return true;
        }),

    body("isComplete")
    .optional()

];

//validacion para actualizar tareas
export const updateTaskValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("La tarea no existe");
      }
      return true;
    }),

  body("title")
    .optional()
    .isString().withMessage("El campo title debe ser un texto")
    .isLength({ min: 5, max: 40 }).withMessage("El name debe tener entre 5 y 40 caracteres"),

  body("description")
    .optional()
    .isLength({min: 10, max: 100}).withMessage("El title debe tener entre 10 y 100 caracteres"),

body("author_id") 
    .optional()
    .custom(async (value) => {
          const user = await User.findOne({ where: { author_id: value } });
          if (!user) {
            throw new Error("El usuario al que se le quiere asignar la tarea no existe");
          }
          return true;
        }),

    body("isComplete")
    .optional()
];

//validacion para eliminar una task
export const deleteTaskValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) throw new Error("La tarea no existe");
    }),
];

//validacion para traer la task por id
export const getTaskValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) throw new Error("La tarea no existe");
    }),
];