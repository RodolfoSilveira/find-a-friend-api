import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { RegisterPetsUseCase } from "../pet-register"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"

export function makePetRegisterUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const petsRegisterUseCase = new RegisterPetsUseCase(petsRepository, orgsRepository)

  return petsRegisterUseCase
}