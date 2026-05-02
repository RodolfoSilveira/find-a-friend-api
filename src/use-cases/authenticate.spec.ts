import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Orgs', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.createWithAddress({
      name: 'loca',
      email: 'loca@contato.com',
      password_hash: await hash('123456', 6),
      phone: '(xx) xxxxx-xxxx',
      cep: '41900-333',
      city: 'Salvador',
      state: 'BA',
      street: 'Rua bolinha'
    })

    const { org } = await sut.execute({
      email: 'loca@contato.com',
      password: '123456',
    })


    expect(org.id).toEqual(expect.any(String))
  })

  it('should be to error password wrong', async () => {
    await orgsRepository.createWithAddress({
      name: 'loca',
      email: 'loca@contato.com',
      password_hash: await hash('123456', 6),
      phone: '(xx) xxxxx-xxxx',
      cep: '41900-333',
      city: 'Salvador',
      state: 'BA',
      street: 'Rua bolinha'
    })

    await expect(() => sut.execute({
      email: 'loca@contato.com',
      password: '123457',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be to error email wrong', async () => {
    await orgsRepository.createWithAddress({
      name: 'loca',
      email: 'loca@contato.com',
      password_hash: await hash('123456', 6),
      phone: '(xx) xxxxx-xxxx',
      cep: '41900-333',
      city: 'Salvador',
      state: 'BA',
      street: 'Rua bolinha'
    })

    await expect(() => sut.execute({
      email: 'loca@contat.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})