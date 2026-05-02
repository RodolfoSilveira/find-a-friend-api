import { makePetRegisterUseCase } from '@/use-cases/factories/make-pet-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import path from 'node:path'
import fs from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { z } from 'zod'
import dayjs from 'dayjs'

const acceptedImageTypes = ['image/png', 'image/jpeg']

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const fields: Record<string, string> = {}
  let uploadedFilePath: string | null = null

  for await (const part of request.parts()) {
    if (part.type === 'field') {
      fields[part.fieldname] = String(part.value)
    }

    if (part.type === 'file') {
      if (!acceptedImageTypes.includes(part.mimetype)) {
        part.file.resume()

        return reply.status(400).send({
          message: 'Formato de imagem inválido. Envie uma imagem PNG ou JPEG.',
        })
      }

      const uploadDirName = 'uploads'
      const uploadDir = path.resolve(process.cwd(), uploadDirName)

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const filename = `${dayjs(Date.now()).format('YYYY-MM-DD-HH:mm:ss')}-${path.basename(part.filename)}`
      uploadedFilePath = path.posix.join(uploadDirName, filename)
      const absoluteFilePath = path.join(uploadDir, filename)

      await pipeline(part.file, fs.createWriteStream(absoluteFilePath))
    }
  }

  if (!uploadedFilePath) {
    return reply.status(400).send({
      message: 'Arquivo não encontrado',
    })
  }

  const requestBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['PUPPY', 'ADULT', 'ELDER']),
    size: z.enum(['SMALL', 'LARGE']),
    energy_level: z.enum(['SMALL', 'NORMAL', 'GREAT']),
    level_of_independence: z.enum(['SMALL', 'LARGE']),
    ambient: z.enum(['SMALL', 'NORMAL', 'LARGE']),
    requirement: z.string()
  })

  const { name, description, age, size, energy_level, level_of_independence, ambient, requirement } = requestBodySchema.parse(fields)

  try {
    const petRegisterUseCase = makePetRegisterUseCase()

    await petRegisterUseCase.execute({
      name,
      description,
      age,
      size,
      energy_level,
      level_of_independence,
      ambient,
      requirement,
      photo: uploadedFilePath,
      org_id: request.user.sub
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
