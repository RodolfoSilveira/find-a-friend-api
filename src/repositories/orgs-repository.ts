import { Address, Org } from "generated/prisma/client"

export type OrgWithAddresses = Org & {
    addresses: Address[]
}

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
    findById(id: string): Promise<OrgWithAddresses | null>
    findByEmail(email: string): Promise<Org | null>
    createWithAddress(data: CreateOrgWithAddressInput): Promise<Org>
}
