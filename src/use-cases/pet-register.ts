import { Age, AMBIENT, ENERGY_LEVEL, LEVEL_OF_INDEPENDENCE, Pet, SIZE } from "generated/prisma/client"
import { petsRepository } from "@/repositories/pets-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { orgsRepository } from "@/repositories/orgs-repository"

interface RegisterPetsUseCaseRequest {
    name: string
    description: string
    age: Age
    size: SIZE
    energy_level: ENERGY_LEVEL
    level_of_independence: LEVEL_OF_INDEPENDENCE
    ambient: AMBIENT
    photo: string
    requirement: string
    org_id: string
}

interface RegisterPetsUseCaseResponse {
    pet: Pet 
}

export class RegisterPetsUseCase {
  constructor(private petsRepository: petsRepository, private orgsRepository: orgsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energy_level,
    level_of_independence,
    ambient,
    photo,
    requirement,
    org_id,
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {

    const org = await this.orgsRepository.findById(org_id)
    
    if (!org) {
      throw new ResourceNotFoundError()
    }
   
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level,
      level_of_independence,
      ambient,
      photo,
      requirement,
      org_id,
    })

    return { pet }
  }
}
