import fastify from 'fastify'
import { env } from './env'
import z, { ZodError } from 'zod'

export const app = fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: z.treeifyError(error) })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // log like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})