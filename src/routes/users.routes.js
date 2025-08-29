import { Router } from "express";
import { validator } from "../middlewares/validator.js";
import { 
    getAllUsers,
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} from "../controllers/users.controllers.js";

import {
  createUserValidation,
  updateUserValidation, 
  deleteUserValidation, 
  getUserValidation
} from "../middlewares/validations/users.validations.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserValidation, validator, getUserById);
router.post("/users", createUserValidation, validator, createUser);
router.put("/users/:id", updateUserValidation, validator, updateUser);
router.delete("/users/:id", deleteUserValidation, validator, deleteUser);

export default router;
