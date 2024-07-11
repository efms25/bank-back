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
        
        if(!user.name || !user.email || !user.password) {
            return response.status(400).json({message: "Bad request! Todos os campos são obrigatorios"})
        }

        this.userService.createUser(user.name, user.email, user.password);
        return response.status(201).json({message: 'Usuário Criado'})
    }

    getUsers = (request: Request, response: Response) => {
        return response.status(200)
    }

    getUser = async (request: Request, response: Response) => {
        const {userId} = request.params
        const user = await this.userService.getUser(userId)
        return response.status(200).json({
            userId: user?.id_user,
            name: user?.name,
            email: user?.email,
        })
    }

    deleteUser = (request: Request, response: Response) => {
        // const {email} = request.body;
        // if(!email) {
        //     return response.status(400).json({message: "Bad request: missing email"})
        // }
        // this.userService.deleteUser(email);
        // return response.status(200).json({message: "One user was removed"})
    }
}

export { UserController }