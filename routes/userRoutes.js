import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user


// GET route for retrieving all users
router.get('/', async (req, res, next) => {
  if (!req.error_message) {
    const users = await userService.getAllUsers();
    res.json(users);
  } 
});

// POST route for creating a new user
router.post('/', createUserValid, responseMiddleware, async (req, res, next) => {
  if (!req.error_message) {
    const user = await userService.createUser(req.body);
    res.json(user);
  }

});

// GET route for retrieving a user by ID
router.get('/:id',updateUserValid, responseMiddleware, async (req, res, next) => {
  if (!req.error_message) {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } 
});

// PATCH route for updating a user
router.patch('/:id', updateUserValid, responseMiddleware,  async (req, res, next) => {
  if (!req.error_message) {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } 
});

// DELETE route for deleting a user
router.delete('/:id',updateUserValid, responseMiddleware, async (req, res, next) => {
  if (!req.error_message) {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  }
});

export { router };
