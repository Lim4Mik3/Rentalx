import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository) {}

  async execute(data: IRequest): Promise<void> {
    const { 
      name,
      email,
      password,
      driver_license
    } = data;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User e-mail already exists!')
    }

    await this.userRepository.create({ 
      name,
      email,
      password,
      driver_license
    })
  }
}

export { CreateUserUseCase };