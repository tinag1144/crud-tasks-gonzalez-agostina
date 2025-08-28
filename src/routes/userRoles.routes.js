import express from "express";
import { assignRole, getUserRoles, getRolsById } from "../controllers/user.role.controllers";

const router = express.Router();

router.post("/assign", assignRole);
router.get("/rols", getUserRoles);
router.get("/rols/:id", getRolsById);



export default router;
