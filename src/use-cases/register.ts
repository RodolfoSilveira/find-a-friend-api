import { orgsRepository } from "@/repositories/orgs-repository"
import { hash } from "bcryptjs"
import { Org } from "generated/prisma/client"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"

interface RegisterOrgsUseCaseRequest {
    name: string,
    email: string,
    password: string,
    phone: string,
    state: string,
    city: string,
    street: string,
    cep: string,
}

interface RegisterOrgsUseCaseResponse {
    org: Org 
}

export class RegisterUseCase {
  constructor(private orgsRepository: orgsRepository) {}

  async execute({
    name,
    email,
    phone,
    password,
    cep,
    city,
    state,
    street
  }: RegisterOrgsUseCaseRequest): Promise<RegisterOrgsUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgsWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgsWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.createWithAddress({
      name,
      email,
      phone,
      password_hash,
      cep,
      city,
      state,
      street,
    })

    return { org }
  }
}
