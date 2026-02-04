import express from 'express'
import { getAllUsers, getCurrentUser, updateUser } from '../controllers/admin-controller.js';

const admin_routes=express.Router();

router.put('/update-user',updateUser);
router.get('/get-users',getAllUsers);
router.get('/get-current-user',getCurrentUser);

export default admin_routes;