import { Router } from "express";
import classroomRouter from "./classroom.router";
import studentRouter from "./student.router";
import subjectRouter from "./subject.router";
import teacherRouter from "./teacher.router";
import userRouter from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/teachers", teacherRouter);
router.use("/students", studentRouter);
router.use("/subjects", subjectRouter);
router.use("/classrooms", classroomRouter);

export default router;
