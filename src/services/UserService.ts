export interface User {
    name: string,
    email: string
}

const db = [
    {
        name: "Jorge",
        email: "Jorge@mail.com"
    }
]


class UserService {
    db: User[]

    constructor(
        database = db
    ) {
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        if(user.name && user.email) {
            this.db.push(user)
            console.log(this.db, "--DB atualizado")
        } else {
            console.log('Nome e email são obrigatórios')
        }
    }

    getAllUsers = () => {
        return db;
    }

    deleteUser = (email: string) => {
        const userIndex = this.db.findIndex(user => user.email === email)
        if(userIndex === -1) {
            console.log("Email fornecido não foi encontrado")
            return false;
        }
        this.db.splice(userIndex, 1);
        console.log(this.db, "--DB after delete")
    }
}

export {
    UserService
}