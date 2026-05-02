import { OrgInfoUseCase } from '../org-info'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeOrgInfoUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const orgInfoUseCase = new OrgInfoUseCase(orgsRepository)

  return orgInfoUseCase
}