import type { NextFunction, Request, Response } from "express";
import prisma from "./../models/prisma.models";

export const createClassroom = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { className } = req.body;
		const classroom = await prisma.classroom.create({
			data: { className },
		});
		res.status(201).json(classroom);
	} catch (error) {
		next(error);
	}
};

export const getClassrooms = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const classrooms = await prisma.classroom.findMany({
			include: { students: true, teachers: true, subjects: true },
		});
		res.status(200).json(classrooms);
	} catch (error) {
		next(error);
	}
};

export const getClassroomById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const classroom = await prisma.classroom.findUnique({
			where: { id: Number(id) },
			include: { students: true, teachers: true, subjects: true },
		});
		if (classroom) {
			res.status(200).json(classroom);
		} else {
			res.status(404).json({ error: "Classroom not found" });
		}
	} catch (error) {
		next(error);
	}
};

export const updateClassroom = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { className } = req.body;
		const classroom = await prisma.classroom.update({
			where: { id: Number(id) },
			data: { className },
		});
		res.status(200).json(classroom);
	} catch (error) {
		next(error);
	}
};

export const deleteClassroom = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		await prisma.classroom.delete({
			where: { id: Number(id) },
		});
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};
