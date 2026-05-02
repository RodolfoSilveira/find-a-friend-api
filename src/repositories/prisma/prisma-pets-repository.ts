import { CreatePetsWithOrgsInput, petsRepository } from "../pets-repository"
import { prisma } from "@/lib/prisma"

export class PrismaPetsRepository implements petsRepository {
  async create(data: CreatePetsWithOrgsInput) {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }
    
}