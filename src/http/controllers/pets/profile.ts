import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makePetProfileUseCase } from '@/use-cases/factories/make-pet-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const requestParamsSchema = z.object({
      id: z.string()
    })

    const { id } = requestParamsSchema.parse(request.params)

    const petProfileUseCase = makePetProfileUseCase()

    const { pet } = await petProfileUseCase.execute({
      id,
    })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}