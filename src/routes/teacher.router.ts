import { Router } from "express";
import {
	createTeacher,
	deleteTeacher,
	getTeacherById,
	getTeachers,
	updateTeacher,
} from "../controllers/teacher.controller";

const router = Router();

router.get("/", getTeachers);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.get("/:id", getTeacherById);
router.delete("/:id", deleteTeacher);

export default router;
