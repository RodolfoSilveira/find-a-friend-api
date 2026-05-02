import { AddressUncheckedCreateInput } from "generated/prisma/models"
import { prisma } from "@/lib/prisma"
import { addressesRepository } from "../addresses-repository"

export class PrismaAddressesRepository implements addressesRepository {
  async create(data: AddressUncheckedCreateInput) {
    const address = await prisma.address.create({
      data
    })

    return address
  }
}