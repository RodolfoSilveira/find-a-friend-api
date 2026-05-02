import { CreatePetsWithOrgsInput, petParams, petsRepository } from "../pets-repository"
import { prisma } from "@/lib/prisma"

export class PrismaPetsRepository implements petsRepository {
  async findAll(city: string, params?: petParams) {
    const pet = await prisma.pet.findMany({
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
              }
            },
          }
        }
      },
      where: {
        age: params?.age,
        size: params?.size,
        energy_level: params?.energy_level,
        level_of_independence: params?.level_of_independence,
        ambient: params?.ambient,
        org: {
          addresses: {
            some: {
              city,
            },
          },
        },
      }
    })

    return pet
  }

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
