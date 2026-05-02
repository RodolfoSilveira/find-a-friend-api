import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { OrgInfoUseCase } from './org-info'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'

let orgsRepository: InMemoryOrgsRepository
let authenticateUseCase: AuthenticateUseCase
let sut: OrgInfoUseCase

describe('Info Orgs', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    authenticateUseCase = new AuthenticateUseCase(orgsRepository)
    sut = new OrgInfoUseCase(orgsRepository)
  })

  it('should to be org info', async () => {
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

    await authenticateUseCase.execute({ email: 'loca@contato.com', password: '123456' })

    const { org } = await sut.execute({ id })

    expect(org.phone).toEqual('(xx) xxxxx-xxxx')
  })
})