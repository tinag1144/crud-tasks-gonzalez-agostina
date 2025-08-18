import { Router } from "express";
import { createRol, getAllRoles } from "../controllers/roles.controllers.js";

const router = Router();

router.post("/create-rol", createRol);
router.get("/roles", getAllRoles);

export default router;