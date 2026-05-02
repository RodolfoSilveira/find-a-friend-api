import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    phone: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    cep: z.string(),
  })

  const { name, email, phone, password, cep, city, state, street } = requestBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      phone,
      password,
      cep,
      city,
      state,
      street
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}