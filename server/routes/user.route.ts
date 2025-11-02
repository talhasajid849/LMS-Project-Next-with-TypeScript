import express from "express";
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken } from "../controllers/user.controller";
import { isAutheticated } from "../middleware/auth";
const useRouter = express.Router();

useRouter.post('/registration', registrationUser);
useRouter.post('/activate-user', activateUser);
useRouter.post('/login', loginUser);
useRouter.get('/logout', isAutheticated ,logoutUser);

useRouter.get("/refresh", updateAccessToken);

useRouter.get("/me", isAutheticated, getUserInfo);

useRouter.post("/social-auth", socialAuth);

export default useRouter;
