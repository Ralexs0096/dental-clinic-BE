import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
  address: z.string().nullable().optional(),
  phone: z.number().nullable().optional()
})

export type UserBody = z.infer<typeof userSchema>
