import { CreateOrgWithAddressInput, orgsRepository } from "../orgs-repository"
import { prisma } from "@/lib/prisma"

export class PrismaOrgsRepository implements orgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async createWithAddress(data: CreateOrgWithAddressInput) {
    const org = await prisma.$transaction(async (tx) => {
      const org = await tx.org.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password_hash: data.password_hash,
          role: 'ADMIN',
        }
      })

      await tx.address.create({
        data: {
          cep: data.cep,
          city: data.city,
          state: data.state,
          street: data.street,
          org_id: org.id,
        }
      })

      return org
    })

    return org
  }
}
