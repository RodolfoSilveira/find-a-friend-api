import { PetProfile, petsRepository } from "@/repositories/pets-repository"
import { Age, AMBIENT, ENERGY_LEVEL, LEVEL_OF_INDEPENDENCE, SIZE } from "generated/prisma/client"

interface petsSearchUseCaseRequest {
    city: string
    age?: Age
    size?: SIZE
    energy_level?: ENERGY_LEVEL
    level_of_independence?: LEVEL_OF_INDEPENDENCE
    ambient?: AMBIENT
}

interface petsSearchUseCaseResponse {
    pets: PetProfile[]
}

export class PetsSearchUseCase {
  constructor(private petsRepository: petsRepository) {}

  async execute({
    city, 
    age, 
    size, 
    energy_level, 
    level_of_independence, 
    ambient
  }: petsSearchUseCaseRequest): Promise<petsSearchUseCaseResponse> {
    const pets = await this.petsRepository.findAll(city, { age, size, energy_level, level_of_independence, ambient } )

    return { pets }
  }
}
