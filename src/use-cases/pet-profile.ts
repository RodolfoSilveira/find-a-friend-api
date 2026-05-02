import { petsRepository } from "@/repositories/pets-repository"
import { PetProfile } from "@/repositories/pets-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface petProfileUseCaseRequest {
    id: string
}

interface petProfileUseCaseResponse {
    pet: PetProfile
}

export class PetProfileUseCase {
  constructor (private petsRepository: petsRepository) {}

  async execute({id}: petProfileUseCaseRequest): Promise<petProfileUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)
    
    if (!pet) {
      throw new ResourceNotFoundError()
    }
    
    return {
      pet
    }
  }
}
