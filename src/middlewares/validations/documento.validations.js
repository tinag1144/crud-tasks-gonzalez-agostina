import { body, param } from "express-validator";

export const createDocumentoValidation = [
  body("author_id")
    .notEmpty().withMessage("El autor es obligatorio")
    .isInt().withMessage("El ID del autor debe ser un número entero"),

  body("document_number")
    .notEmpty().withMessage("El número de documento es obligatorio")
    .isLength({ max: 100 }).withMessage("El número de documento no puede superar los 100 caracteres"),

  body("issue_date")
    .notEmpty().withMessage("La fecha de emisión es obligatoria")
    .isISO8601().withMessage("La fecha de emisión debe estar en formato válido (YYYY-MM-DD)"),

  body("expiration_date")
    .notEmpty().withMessage("La fecha de expiración es obligatoria")
    .isISO8601().withMessage("La fecha de expiración debe estar en formato válido (YYYY-MM-DD)")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.issue_date)) {
        throw new Error("La fecha de expiración debe ser posterior a la fecha de emisión");
      }
      return true;
    })
];

export const updateDocumentoValidation = [
  param("id")
    .isInt().withMessage("El ID del documento debe ser un número válido"),

  body("document_number")
    .optional()
    .isLength({ max: 100 }).withMessage("El número de documento no puede superar los 100 caracteres"),

  body("issue_date")
    .optional()
    .isISO8601().withMessage("La fecha de emisión debe estar en formato válido (YYYY-MM-DD)"),

  body("expiration_date")
    .optional()
    .isISO8601().withMessage("La fecha de expiración debe estar en formato válido (YYYY-MM-DD)")
    .custom((value, { req }) => {
      if (req.body.issue_date && new Date(value) <= new Date(req.body.issue_date)) {
        throw new Error("La fecha de expiración debe ser posterior a la de emisión");
      }
      return true;
    })
];

export const deleteDocumentoValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número válido")
];

export const getDocumentoByIdValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número válido")
];
