import { Router } from "express";
import { UserControllers } from "./user.controller";
import { authMiddleware } from "../../../middleware/auth";

const router = Router();

console.log("User routes being created...");

router.post("/register", UserControllers.createUser);
router.post("/login", UserControllers.loginUser);
router.post("/refresh-token", UserControllers.refreshToken);
router.post("/logout", UserControllers.logoutUser);
router.get('/me', authMiddleware, UserControllers.getUserInfo);

export const UserRoutes = router;
