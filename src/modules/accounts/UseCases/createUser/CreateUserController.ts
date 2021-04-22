import { Request, Response } from "express";
import { container } from "tsyringe";
import { hash } from 'bcryptjs'

import { CreateUserUseCase } from './CreateUserUseCase'


class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase)

    const { 
      name,
      email,
      password,
      driver_license
    } = request.body;

    const passwordHashed = await hash(password, 8);

    await createUserUseCase.execute({ 
      name,
      email,
      password: passwordHashed,
      driver_license
    })

    return response.status(201).send();
  }
}

export { CreateUserController };