import { Router } from "express";
import { auth_login } from "./auth/auth";
import { checkUser, checkBanned } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/login", checkUser, checkBanned, auth_login);

export default userRouter;