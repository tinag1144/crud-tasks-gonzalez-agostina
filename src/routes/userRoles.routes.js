import express from "express";
import { assignRole, getUserRoles } from "../controllers/user.role.controllers";

const router = express.Router();

router.post("/assign", assignRole);
router.get("/:user_id", getUserRoles);

export default router;
