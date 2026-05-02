import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { register } from "./register"

export async function petsRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJWT] }, register)
}