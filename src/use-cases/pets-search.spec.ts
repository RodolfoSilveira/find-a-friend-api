import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetsSearchUseCase } from './pets-search'
import { Age, AMBIENT, ENERGY_LEVEL, LEVEL_OF_INDEPENDENCE, SIZE } from 'generated/prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: PetsSearchUseCase

describe('Pets Search', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new PetsSearchUseCase(petsRepository)
  })

  it('should be able to search pets by filters', async () => {
    await petsRepository.create({
      name: 'Thor',
      description: 'Friendly dog',
      age: Age.ADULT,
      size: SIZE.LARGE,
      energy_level: ENERGY_LEVEL.GREAT,
      level_of_independence: LEVEL_OF_INDEPENDENCE.LARGE,
      ambient: AMBIENT.LARGE,
      photo: 'thor.jpg',
      requirement: 'Walks every day',
      org_id: 'org-1',
    })

    await petsRepository.create({
      name: 'Nina',
      description: 'Calm cat',
      age: Age.PUPPY,
      size: SIZE.SMALL,
      energy_level: ENERGY_LEVEL.SMALL,
      level_of_independence: LEVEL_OF_INDEPENDENCE.SMALL,
      ambient: AMBIENT.SMALL,
      photo: 'nina.jpg',
      requirement: 'Quiet home',
      org_id: 'org-2',
    })

    const { pets } = await sut.execute({
      city: 'Salvador',
      age: Age.ADULT,
      size: SIZE.LARGE,
      energy_level: ENERGY_LEVEL.GREAT,
      level_of_independence: LEVEL_OF_INDEPENDENCE.LARGE,
      ambient: AMBIENT.LARGE,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toEqual('Thor')
  })
})
