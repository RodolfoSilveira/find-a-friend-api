import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { register } from "./register"
import { profile } from "./profile"

export async function petsRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJWT] }, register)
  app.get('/pets/:id',  { onRequest: [verifyJWT] }, profile)
}