import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { env } from './env'
import z, { ZodError } from 'zod'
import { orgsRoutes } from './http/controllers/orgs/routes'
import fastifyCookie from '@fastify/cookie'
import { petsRoutes } from './http/controllers/pets/routes'
import path from 'node:path'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)
app.register(multipart)
app.register(fastifyStatic, {
  root: path.resolve(process.cwd(), 'uploads'),
  prefix: '/files/',
})

app.register(orgsRoutes)
app.register(petsRoutes)

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