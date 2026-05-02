import { orgsRepository } from "@/repositories/orgs-repository"
import { Org } from "generated/prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface OrgInfoUseCaseRequest {
    id: string
}

interface OrgInfoUseCaseResponse {
    org: Org
}

export class OrgInfoUseCase {
  constructor(private orgsRepository: orgsRepository ) {}

  async execute({ id }: OrgInfoUseCaseRequest): Promise<OrgInfoUseCaseResponse> {
    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org
    }
  }
}