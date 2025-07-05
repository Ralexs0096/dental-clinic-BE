import { z } from 'zod'

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  address: z.string(),
  phone: z.string(),
  role: z.string()
})

export type CreateUserBody = z.infer<typeof createUserSchema>
