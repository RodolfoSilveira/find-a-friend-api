import { makePetsSearchUseCase } from '@/use-cases/factories/make-pets-search-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string().min(1),
    age: z.enum(['PUPPY', 'ADULT', 'ELDER']).optional(),
    size: z.enum(['SMALL', 'LARGE']).optional(),
    energy_level: z.enum(['SMALL', 'NORMAL', 'GREAT']).optional(),
    level_of_independence: z.enum(['SMALL', 'LARGE']).optional(),
    ambient: z.enum(['SMALL', 'NORMAL', 'LARGE']).optional(),
  })

  const {
    city,
    age,
    size,
    energy_level,
    level_of_independence,
    ambient,
  } = searchPetsQuerySchema.parse(request.query)

  const petsSearchUseCase = makePetsSearchUseCase()

  const { pets } = await petsSearchUseCase.execute({
    city,
    age,
    size,
    energy_level,
    level_of_independence,
    ambient,
  })

  return reply.status(200).send({ pets })
}
