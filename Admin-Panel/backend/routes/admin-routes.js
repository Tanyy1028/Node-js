import express from 'express'
import { getAllUsers, getCurrentUser, updateUser } from '../controllers/admin-controller.js';

const admin_routes=express.Router();

admin_routes.put('/update-user',updateUser);
admin_routes.get('/get-users',getAllUsers);
admin_routes.get('/get-current-user',getCurrentUser);

export default admin_routes;