import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { makeMockResponse } from '../__mocks__/mockResponse.mock'
import { Request } from 'express'

const mockUserService = {
    createUser: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe("UserController", () => {

    const userController = new UserController()

    it("Deve retornar os usuários", () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()

        const users = userController.getUsers(mockRequest,mockResponse);
        expect(mockResponse.state.status).toBe(200)
    })

    it("Deve adicionar um novo usuário", () => {
        const mockRequest = {
            body: {
                name: "Kodah",
                email: "kodah@email.com",
                password: "password"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: "Usuário Criado"})
        
    })

    it("Deve retornar erro caso falte o nome", () => {
        const mockRequest = {
            body: {
                name: "",
                email: "kodah@email.com",
                password: 'password'
            }
        } as Request

        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: "Bad request! Todos os campos são obrigatorios"})
    })


    it("Deve retornar erro caso falte o email", () => {
        const mockRequest = {
            body: {
                name: "kodah",
                email: "",
                password: 'password'
            }
        } as Request

        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: "Bad request: email invalid"})
    })

    it("Deve retornar erro caso falte o password", () => {
        const mockRequest = {
            body: {
                name: "kodah",
                email: "kodah@email.com",
                password: ""
            }
        } as Request

        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: "Bad request: password invalid"})
    })

    it("Deve remover um item do DB", () => {
        const mockRequest = {
            body: {
                email: "Jorge@mail.com"
            }
        } as Request

        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({message: "One user was removed"})
    })

    it("Deve retornar um erro de bad request por não haver email informado na deleção", () => {
        const mockRequest = {
            body: {
                email: ""
            }
        } as Request

        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Bad request: missing email"})
    })
})