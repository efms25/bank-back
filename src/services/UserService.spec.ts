import { UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

const mockUser = {
    id_user: '123345',
    name: 'kodah',
    email: 'kodah@mail.com',
    password: '123456'
}

describe("UserService", () => {
    const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id_user: '123345',
            name: 'kodah',
            email: 'kodah@mail.com',
            password: '123456'
        }));
        const response = await userService.createUser('kodah', 'kodah@mail.com', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject({
            id_user: '123345',
            name: 'kodah',
            email: 'kodah@mail.com',
            password: '123456'
        })
    })

    it('Deve retornar um token de usuario', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('kodah@mail.com','123456')
        expect(token).toBe('token')
    })

    it('Deve retornar um erro caso não encontre um usuário',  async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@mail.com','123456')).rejects.toThrow(new Error('Email/password invalid!'))
    })
})