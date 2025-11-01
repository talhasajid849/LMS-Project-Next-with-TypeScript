import express from "express";
import { activateUser, loginUser, logoutUser, registrationUser } from "../controllers/user.controller";
import { isAutheticated } from "../middleware/auth";
const useRouter = express.Router();

useRouter.post('/registration', registrationUser);
useRouter.post('/activate-user', activateUser);
useRouter.post('/login', loginUser);
useRouter.get('/logout', isAutheticated ,logoutUser);

export default useRouter;
