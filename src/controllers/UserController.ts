import {Request, response, Response} from 'express'
import { UserService } from '../services/UserService';



class UserController {
    userService: UserService

    constructor(
        userService = new UserService
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const user = request.body;
        
        if(!user.name) {
            return response.status(400).json({message: "Bad request: name invalid"})
        }
        if(!user.email) {
            return response.status(400).json({message: "Bad request: email invalid"})
        }

        this.userService.createUser(user.name, user.email);
        return response.status(201).json({message: 'Usuário Criado'})
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers();
        return response.status(200).json(users)
    }

    deleteUser = (request: Request, response: Response) => {
        const {email} = request.body;
        if(!email) {
            return response.status(400).json({message: "Bad request: missing email"})
        }
        this.userService.deleteUser(email);
        return response.status(200).json({message: "One user was removed"})
    }
}

export { UserController }