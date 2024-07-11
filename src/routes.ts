import { Router } from 'express';
import { LoginController } from './controllers/LoginController';
import { UserController } from './controllers/UserController';


export const router = Router()

const userController = new UserController()
const loginController = new LoginController()

router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.delete('/user', userController.deleteUser)

router.post('/login', loginController.login)