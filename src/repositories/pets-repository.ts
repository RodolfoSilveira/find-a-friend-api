import { Age, AMBIENT, ENERGY_LEVEL, LEVEL_OF_INDEPENDENCE, Org, Pet, SIZE } from "generated/prisma/client"

export type PetsWithOrgs = Pet & {
 org: Org
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

export interface petsRepository {
    create(data: CreatePetsWithOrgsInput): Promise<Pet>
}