import { AppDataSource } from "../database"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"


class UserService {
    private userRepository: UserRepository

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ) {
        this.userRepository = userRepository
    }

    createUser = async (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name,email,password)
        return this.userRepository.createUser(user)
    }

    getUser = () => {

    }

    getAuthenticatedUser = async (email: string, password: string): Promise<User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email,password);
    }

    getToken = async (email: string, password: string) => {
        const user = await this.getAuthenticatedUser(email, password)

        return user?.id_user
    }
}

export {
    UserService
}