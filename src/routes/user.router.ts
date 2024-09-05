import { Router } from "express";

import {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
