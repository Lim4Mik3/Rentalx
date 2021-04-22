import { Specification } from "../entities/Specifications";

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}


interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ICreateSpecificationsDTO, ISpecificationsRepository}