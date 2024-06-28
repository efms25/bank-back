import { UserService, User } from "./UserService"

describe("UserService", () => {
    const mockDb: User[] = [];

    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser("Jorge", "Jorge@mail.com");
        expect(mockConsole).toHaveBeenCalledWith(mockDb, "--DB atualizado")
    })

    it('Deve retornar um erro por causa da falta de campos obrigatórios', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser("", "");
        expect(mockConsole).toHaveBeenCalledWith("Nome e email são obrigatórios")
    })

    it('Deve retornar os usuário do DB', () => {
        const returnedDb = userService.getAllUsers();
        console.log(returnedDb, 'db returned')
        expect(returnedDb).toMatchObject(mockDb)
    })

    it("Deve remover item do DB", () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        const mockEmail = "Jorge@mail.com"
        userService.deleteUser(mockEmail);
        expect(mockConsole).toHaveBeenCalledWith([], "--DB after delete")
    })
})