import { Pet } from "generated/prisma/client"
import { CreatePetsWithOrgsInput, petsRepository } from "../pets-repository"

export class InMemoryPetsRepository implements petsRepository {
  public items: Pet[] = []

  async create(data: CreatePetsWithOrgsInput) {
    const pet = {
      id: 'pet-1',
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      level_of_independence: data.level_of_independence,
      ambient: data.ambient,
      photo: data.photo,
      requirement: data.requirement,
      org_id: data.org_id,
      created_at: new Date()
    }

    this.items.push(pet)

    return pet
  }  
}