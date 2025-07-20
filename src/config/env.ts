import { config as loadEnv } from 'dotenv'
import { z } from 'zod'

loadEnv()

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z
    .string()
    .url({ message: 'DATABASE_URL must be a valid MongoDB URI' }),
  SECRET: z.string().min(10, 'SECRET must be at least 10 characters'),
  SERVICE: z.enum(['hotmail', 'gmail']),
  EMAIL_USERNAME: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables: ', _env.error.format())
  process.exit(1)
}

export const env = _env.data
