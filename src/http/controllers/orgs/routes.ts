import { FastifyInstance } from "fastify"
import { register } from "./register"
import { authenticate } from "./authenticate"
import { refresh } from "./refresh"
import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { info } from "./info"
import { verifyOrgRole } from "@/http/middlewares/verify-org-rules"

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/info', { onRequest: [verifyJWT, verifyOrgRole('ADMIN')] }, info)
}