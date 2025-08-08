import { Router } from "express";
import { 
    getAllUsers,
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/userss/:id", deleteUser);

export default router;
