import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeOrgInfoUseCase } from '@/use-cases/factories/make-org-info-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function info(request: FastifyRequest, reply: FastifyReply) {
  try {
    const orgInfoUseCase = makeOrgInfoUseCase()

    const { org } = await orgInfoUseCase.execute({
      id: request.user.sub
    })

    return reply.status(200).send({ 
      org: {
        ...org,
        role: undefined,
        password_hash: undefined
      }
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}