import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PetProfileUseCase } from "../pet-profile"

export function makePetProfileUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petProfileUseCase = new PetProfileUseCase(petsRepository)

  return petProfileUseCase
}