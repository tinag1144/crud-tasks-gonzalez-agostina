import express from "express";
import { assignRole, getUserRoles, getRolsById } from "../controllers/user.role.controllers";
import { getUserRoleValidation } from "../middlewares/validations/user_role.validations.js";

const router = express.Router();

router.post("/assign", assignRole);
router.get("/rols", getUserRoles);
router.get("/rols/:id", getUserRoleValidation, validator, getRolsById);



export default router;
