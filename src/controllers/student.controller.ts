import type { NextFunction, Request, Response } from "express";
import prisma from "./../models/prisma.models";

export const createStudent = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId, classroomId } = req.body;
		const student = await prisma.student.create({
			data: {
				userId,
				classroomId,
			},
		});
		res.status(201).json(student);
	} catch (error) {
		next(error);
	}
};

export const getStudents = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const students = await prisma.student.findMany({
			include: { user: true, classroom: true },
		});
		res.status(200).json(students);
	} catch (error) {
		next(error);
	}
};

export const getStudentById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const student = await prisma.student.findUnique({
			where: { registration: id },
			include: { user: true, classroom: true },
		});
		if (student) {
			res.status(200).json(student);
		} else {
			res.status(404).json({ error: "Student not found" });
		}
	} catch (error) {
		next(error);
	}
};

export const updateStudent = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { classroomId } = req.body;
		const student = await prisma.student.update({
			where: { registration: id },
			data: { classroomId },
		});
		res.status(200).json(student);
	} catch (error) {
		next(error);
	}
};

export const deleteStudent = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		await prisma.student.delete({
			where: { registration: id },
		});
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};
