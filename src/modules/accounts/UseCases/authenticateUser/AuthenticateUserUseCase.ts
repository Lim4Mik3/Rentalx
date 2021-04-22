import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    email: string;
    name: string;
  }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email)
    
    if(!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password)
    
    if(!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    const token = sign({}, '629154f7128dbc61abbdf5264038e57d', {
      subject: user.id,
      expiresIn: '1d'
    })

    const returnToken: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      }
    }

    return returnToken;
  }
}

export { AuthenticateUserUseCase };