import { CreateOrgWithAddressInput, orgsRepository } from "../orgs-repository"
import { Org, ROLE } from "generated/prisma/client"

export class InMemoryOrgsRepository implements orgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find(item => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async createWithAddress(data: CreateOrgWithAddressInput) {
    const org = {
      id: 'org-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      role: ROLE.ADMIN,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
