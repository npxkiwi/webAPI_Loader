import { Router } from "express";
import { auth_login, auth_signup } from "./auth/auth";
import { checkUser, checkBanned, checkExistingUser } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/login", checkUser, checkBanned, auth_login);
userRouter.get("/signup", checkExistingUser, auth_signup);

export default userRouter;