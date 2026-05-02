import { randomUUID } from "node:crypto"
import { addressesRepository } from "../addresses-repository"
import { Address, Prisma } from "generated/prisma/client"

export class InMemoryAddressesRepository implements addressesRepository {    
  public items: Address[] = []

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: randomUUID(),
      cep: data.cep,
      city: data.city,
      street: data.street,
      state: data.state,
      created_at: new Date(),
      org_id: data.org_id
    }

    this.items.push(address)

    return address
  }
}