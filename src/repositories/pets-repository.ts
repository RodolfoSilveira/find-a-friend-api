import { Address, Age, AMBIENT, ENERGY_LEVEL, LEVEL_OF_INDEPENDENCE, Org, Pet, SIZE } from "generated/prisma/client"

type PublicAddress = Pick<Address, 'id' | 'cep' | 'street' | 'city' | 'state'>

type PublicOrg = Pick<Org, 'id' | 'name' | 'email' | 'phone'> & {
    addresses: PublicAddress[]
}

export type PetProfile = Omit<Pet, 'created_at' | 'org_id'> & {
    org: PublicOrg
}

export interface CreatePetsWithOrgsInput {
    name: string
    description: string
    age: Age
    size: SIZE
    energy_level: ENERGY_LEVEL
    level_of_independence: LEVEL_OF_INDEPENDENCE
    ambient: AMBIENT
    photo: string
    requirement: string
    org_id: string
}

export interface petParams {
    age?: Age
    size?: SIZE
    energy_level?: ENERGY_LEVEL
    level_of_independence?: LEVEL_OF_INDEPENDENCE
    ambient?: AMBIENT
}

export interface petsRepository {
    create(data: CreatePetsWithOrgsInput): Promise<Pet>
    findById(id: string): Promise<PetProfile | null>
    findAll(city: string, params?: petParams): Promise<PetProfile[]>
}
