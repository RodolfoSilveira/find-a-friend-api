import { CreatePetsWithOrgsInput, petsRepository } from "../pets-repository"
import { prisma } from "@/lib/prisma"

export class PrismaPetsRepository implements petsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        age: true,
        size: true,
        energy_level: true,
        level_of_independence: true,
        ambient: true,
        photo: true,
        requirement: true,
        org: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            addresses: {
              select: {
                id: true,
                cep: true,
                street: true,
                city: true,
                state: true,  
              },
            },
          },
        },
      }
    })

    return pet
  }

  async create(data: CreatePetsWithOrgsInput) {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }
    
}
