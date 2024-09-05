import { Router } from "express";
import { getStudentById } from "../controllers/student.controller";
import {
	createSubject,
	deleteSubject,
	getSubjectById,
	getSubjects,
	updateSubject,
} from "../controllers/subject.controller";

const router = Router();

router.get("/", getSubjects);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.get("/:id", getSubjectById);
router.delete("/:id", deleteSubject);

export default router;
