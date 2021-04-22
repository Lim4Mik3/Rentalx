import { hash } from "bcryptjs";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {

  users: User[] = [];

  async create({ driver_license, email, name, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    const passwordHashed = await hash(password, 8);
    
    Object.assign(user, { 
      driver_license, 
      email, 
      name, 
      password: passwordHashed
    })

    this.users.push(user);

    return;   
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}

export { UsersRepositoryInMemory };