import { UserService } from "./UserService"

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/UserRepository')

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


})