import { Address, Prisma } from "generated/prisma/client"

export interface addressesRepository {
    create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
}