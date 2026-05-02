import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { register } from "./register"
import { profile } from "./profile"
import { search } from "./search"

export async function petsRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJWT] }, register)
  app.get('/pets/:id',  { onRequest: [verifyJWT] }, profile)
  app.get('/pets/search', search)
}
