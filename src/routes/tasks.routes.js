import { validator } from "../middlewares/validator.js";
import { Router } from "express";
import { 
    getTasks,
    getTask, 
    createTask, 
    updateTask, 
    deleteTask 
} from "../controllers/tasks.controllers.js";
import {
    deleteTaskValidation,
    updateTaskValidation,
    getTaskValidation,
    createTaskValidation
} from "../middlewares/validations/tasks.validations.js";
    
const router = Router();

router.get("/tasks",  getTasks);
router.get("/tasks/:id", getTaskValidation, validator, getTask);
router.post("/tasks", createTaskValidation, validator, createTask);
router.put("/tasks/:id", updateTaskValidation, validator, updateTask);
router.delete("/tasks/:id", deleteTaskValidation, validator, deleteTask);

export default router;
