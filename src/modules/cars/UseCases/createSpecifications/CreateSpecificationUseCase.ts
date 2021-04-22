import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExist = await this.specificationsRepository.findByName(name)  
  
    if(specificationAlreadyExist) {
      throw new AppError('Already exist specification!');
    }
  
    await this.specificationsRepository.create({
      name,
      description
    })
  }
}

export { CreateSpecificationUseCase };