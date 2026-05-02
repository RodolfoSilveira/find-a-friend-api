import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { RegisterPetsUseCase } from "./pet-register"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { hash } from "bcryptjs"
import { Age, AMBIENT, ENERGY_LEVEL, LEVEL_OF_INDEPENDENCE, SIZE } from "generated/prisma/client"

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetsUseCase

describe('Pets Reister', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetsUseCase(petsRepository, orgsRepository)
  })
  it('should to be register pet', async () => {
    const { id } = await orgsRepository.createWithAddress({
      name: 'loca',
      email: 'loca@contato.com',
      phone: '(xx) xxxxx-xxxx',
      password_hash: await hash('123456', 6),
      cep: '41900-333',
      city: 'Salvador',
      state: 'BA',
      street: 'Rua bolinha'
    })

    const { pet }  = await sut.execute({
      name: 'teste',
      description: 'teste 2',
      age: Age.ADULT,
      size: SIZE.LARGE,
      energy_level: ENERGY_LEVEL.GREAT,
      level_of_independence: LEVEL_OF_INDEPENDENCE.LARGE,
      ambient: AMBIENT.LARGE,
      photo: '2026-05-02-11:51:51-cao.jpg',
      requirement: 'teste',
      org_id: id,
    })

    expect(pet.photo).toEqual('2026-05-02-11:51:51-cao.jpg')
  })
})