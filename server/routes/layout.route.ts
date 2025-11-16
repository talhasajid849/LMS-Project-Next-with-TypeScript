import express from 'express'
import { authorizedRoles, isAutheticated } from '../middleware/auth';
import { createLayout } from '../controllers/layout.controller';

const layoutRouter = express.Router();


layoutRouter.post("/create-layout", isAutheticated, authorizedRoles("admin"), createLayout);


export default layoutRouter;