import { Pet } from "generated/prisma/client"
import { CreatePetsWithOrgsInput, PetProfile, petParams, petsRepository } from "../pets-repository"

export class InMemoryPetsRepository implements petsRepository {
  public items: Pet[] = []

  async findAll(city: string, params?: petParams) {
    return this.items
      .filter((pet) => {
        return (
          (!params?.age || pet.age === params.age) &&
          (!params?.size || pet.size === params.size) &&
          (!params?.energy_level || pet.energy_level === params.energy_level) &&
          (!params?.level_of_independence || pet.level_of_independence === params.level_of_independence) &&
          (!params?.ambient || pet.ambient === params.ambient)
        )
      })
      .map((pet) => {
        const petProfile: PetProfile = {
          id: pet.id,
          name: pet.name,
          description: pet.description,
          age: pet.age,
          size: pet.size,
          energy_level: pet.energy_level,
          level_of_independence: pet.level_of_independence,
          ambient: pet.ambient,
          photo: pet.photo,
          requirement: pet.requirement,
          org: {
            id: pet.org_id,
            name: '',
            email: '',
            phone: '',
            addresses: [
              {
                id: '',
                cep: '',
                street: '',
                city,
                state: '',
              }
            ],
          },
        }

        return petProfile
      })
  }

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id)

    if (!pet) {
      return null
    }

    const petProfile: PetProfile = {
      id: pet.id,
      name: pet.name,
      description: pet.description,
      age: pet.age,
      size: pet.size,
      energy_level: pet.energy_level,
      level_of_independence: pet.level_of_independence,
      ambient: pet.ambient,
      photo: pet.photo,
      requirement: pet.requirement,
      org: {
        id: pet.org_id,
        name: '',
        email: '',
        phone: '',
        addresses: [],
      },
    }

    return petProfile
  }

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
