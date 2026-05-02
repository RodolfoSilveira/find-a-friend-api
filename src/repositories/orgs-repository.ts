import { Org } from "generated/prisma/client"

export interface CreateOrgWithAddressInput {
    name: string
    email: string
    phone: string
    password_hash: string
    cep: string
    city: string
    state: string
    street: string
}

export interface orgsRepository {
    findByEmail(email: string): Promise<Org | null>
    createWithAddress(data: CreateOrgWithAddressInput): Promise<Org>
}
