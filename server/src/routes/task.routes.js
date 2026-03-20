import { Router } from "express";
import { createTask } from "../controller/task.controller.js";
import { getTasks, getSingleTask, updateTask } from "../controller/task.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { deleteTask } from "../controller/task.controller.js";

const router = Router();

router.post("/create", authenticate, createTask);
router.get("/tasks", authenticate, getTasks);

router.get("/:id", authenticate, getSingleTask);
router.patch("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;