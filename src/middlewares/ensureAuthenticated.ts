import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
      throw new AppError('Token is missing!', 401)
    }

    const [, token] = authHeader.split(' ');

    const { sub: user_id } = verify(token, '629154f7128dbc61abbdf5264038e57d') as IPayload;

    const usersRepository = new UserRepository();

    const user = await usersRepository.findById(user_id);
  
    if(!user) {
      throw new AppError('User does no exist!', 401)
    }

    request.user = {
      id: user_id
    }

    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }
}

