import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PetsSearchUseCase } from "../pets-search"

export function makePetsSearchUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petsSearchUseCase = new PetsSearchUseCase(petsRepository)

  return petsSearchUseCase
}