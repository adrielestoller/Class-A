import type { NextFunction, Request, Response } from "express";
import prisma from "./../models/prisma.models";

export const createSubject = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, schedule, teacherId, classroomId, dayOfWeek } = req.body;
		const subject = await prisma.subject.create({
			data: {
				name,
				schedule,
				teacherId,
				classroomId,
				dayOfWeek,
			},
		});
		res.status(201).json(subject);
	} catch (error) {
		next(error);
	}
};

export const getSubjects = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const subjects = await prisma.subject.findMany({
			include: { teacher: true, classroom: true },
		});
		res.status(200).json(subjects);
	} catch (error) {
		next(error);
	}
};

export const getSubjectById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const subject = await prisma.subject.findUnique({
			where: { id: Number(id) },
			include: { teacher: true, classroom: true },
		});
		if (subject) {
			res.status(200).json(subject);
		} else {
			res.status(404).json({ error: "Subject not found" });
		}
	} catch (error) {
		next(error);
	}
};

export const updateSubject = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { name, schedule, dayOfWeek } = req.body;
		const subject = await prisma.subject.update({
			where: { id: Number(id) },
			data: { name, schedule, dayOfWeek },
		});
		res.status(200).json(subject);
	} catch (error) {
		next(error);
	}
};

export const deleteSubject = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		await prisma.subject.delete({
			where: { id: Number(id) },
		});
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};
