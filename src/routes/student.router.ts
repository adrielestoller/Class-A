import { Router } from "express";
import {
	createStudent,
	deleteStudent,
	getStudentById,
	getStudents,
	updateStudent,
} from "../controllers/student.controller";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);

export default router;
