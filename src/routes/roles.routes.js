import { validator } from "../middlewares/validator.js";
import { Router } from "express";
import { createRol, deleteRol, getAllRoles, getRolById, updateRol } from "../controllers/roles.controllers.js";
import { createRolValidation, deleteRolValidation, getRolValidation, updateRolValidation } from "../middlewares/validations/roles.validations.js";

const router = Router();

router.post("/rol", createRolValidation, validator, createRol);
router.get("/rols", getAllRoles);
router.get("/rol/:id", getRolValidation, validator, getRolById);
router.put("/rol/:id", updateRolValidation, validator, updateRol);
router.delete("/rol/:id", deleteRolValidation, validator, deleteRol)

export default router;