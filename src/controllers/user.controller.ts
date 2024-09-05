import type { NextFunction, Request, Response } from "express";
import prisma from "./../models/prisma.models";

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, email, role } = req.body;
		const user = await prisma.user.create({
			data: { name, email, role },
		});
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		const user = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { name, email, role } = req.body;
		const user = await prisma.user.update({
			where: { id: Number(id) },
			data: { name, email, role },
		});
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		await prisma.user.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(204).send({ success: `${id} has been deleted` });
	} catch (error) {
		next(error);
	}
};
