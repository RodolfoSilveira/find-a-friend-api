import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { register } from "./register"
import { profile } from "./profile"
import { search } from "./search"
import { verifyOrgRole } from "@/http/middlewares/verify-org-rules"

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search', search)
  app.get('/pets/:id', profile)

  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJWT, verifyOrgRole('ADMIN')] }, register)
}
