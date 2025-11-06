import express from 'express'
import { authorizedRoles, isAutheticated } from '../middleware/auth';
import { getAllNotifications, updateNotification } from '../controllers/notification.controller';

const notificationRoute = express.Router();


notificationRoute.get("/get-all-notification", isAutheticated, authorizedRoles("admin"), getAllNotifications);
notificationRoute.put("/update-notification/:id", isAutheticated, authorizedRoles("admin"), updateNotification);



export default notificationRoute;