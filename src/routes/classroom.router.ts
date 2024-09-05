import { Router } from "express";
import {
	createClassroom,
	deleteClassroom,
	getClassroomById,
	getClassrooms,
	updateClassroom,
} from "../controllers/classroom.controller";

const router = Router();

router.get("/", getClassrooms);
router.post("/", createClassroom);
router.put("/:id", updateClassroom);
router.get("/:id", getClassroomById);
router.delete("/:id", deleteClassroom);

export default router;
