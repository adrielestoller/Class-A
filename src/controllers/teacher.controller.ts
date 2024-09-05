import type { NextFunction, Request, Response } from "express";
import prisma from "./../models/prisma.models";

export const createTeacher = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, userId } = req.body;
		const teacher = await prisma.teacher.create({
			data: {
				name,
				userId,
			},
		});
		res.status(201).json(teacher);
	} catch (error) {
		next(error);
	}
};

export const getTeachers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const teachers = await prisma.teacher.findMany({
			include: { subjects: true, classrooms: true, user: true },
		});
		res.status(200).json(teachers);
	} catch (error) {
		next(error);
	}
};

export const getTeacherById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const teacher = await prisma.teacher.findUnique({
			where: { id: Number(id) },
			include: { subjects: true, classrooms: true, user: true },
		});
		if (teacher) {
			res.status(200).json(teacher);
		} else {
			res.status(404).json({ error: "Teacher not found" });
		}
	} catch (error) {
		next(error);
	}
};

export const updateTeacher = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const teacher = await prisma.teacher.update({
			where: { id: Number(id) },
			data: { name },
		});
		res.status(200).json(teacher);
	} catch (error) {
		next(error);
	}
};

export const deleteTeacher = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		await prisma.teacher.delete({
			where: { id: Number(id) },
		});
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};
