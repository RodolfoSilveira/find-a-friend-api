import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetProfileUseCase } from './pet-profile'
import { Age, AMBIENT, ENERGY_LEVEL, LEVEL_OF_INDEPENDENCE, SIZE } from 'generated/prisma/client'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: PetProfileUseCase

describe('Pet Profile', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new PetProfileUseCase(petsRepository)
  })

  it('should to be pet profile', async () => {
    const org = await orgsRepository.createWithAddress({
      name: 'loca',
      email: 'loca@contato.com',
      phone: '(xx) xxxxx-xxxx',
      password_hash: await hash('123456', 6),
      cep: '41900-333',
      city: 'Salvador',
      state: 'BA',
      street: 'Rua bolinha'
    })

    const { id } = await petsRepository.create({
      name: 'teste',
      description: 'teste 2',
      age: Age.ADULT,
      size: SIZE.LARGE,
      energy_level: ENERGY_LEVEL.GREAT,
      level_of_independence: LEVEL_OF_INDEPENDENCE.LARGE,
      ambient: AMBIENT.LARGE,
      photo: '2026-05-02-11:51:51-cao.jpg',
      requirement: 'teste',
      org_id: org.id,
    })

    const { pet } = await sut.execute({ id })

    expect(pet.photo).toEqual('2026-05-02-11:51:51-cao.jpg')
  })
})