import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Orgs', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'loca',
      email: 'loca@contato.com',
      phone: '(xx) xxxxx-xxxx',
      password: '123456',
      cep: '41900-333',
      city: 'Salvador',
      state: 'BA',
      street: 'Rua bolinha'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be to error same email', async () => {
    await sut.execute({
      name: 'loca',
      email: 'loca@contato.com',
      phone: '(xx) xxxxx-xxxx',
      password: '123456',
      cep: '41900-333',
      city: 'Salvador',
      state: 'BA',
      street: 'Rua bolinha'
    })

    await expect(() => 
      sut.execute({
        name: 'loca',
        email: 'loca@contato.com',
        phone: '(xx) xxxxx-xxxx',
        password: '123456',
        cep: '41900-333',
        city: 'Salvador',
        state: 'BA',
        street: 'Rua bolinha'
      })).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should be to able register', async () => {
    const { org } = await sut.execute({
      name: 'loca',
      email: 'loca@contato.com',
      phone: '(xx) xxxxx-xxxx',
      password: '123456',
      cep: '41900-333',
      city: 'Salvador',
      state: 'BA',
      street: 'Rua bolinha'
    })

    expect(org.id).toEqual(expect.any(String))
  })
})