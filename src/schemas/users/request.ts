import { z } from 'zod'

/**
 * **************** /user - post ****************
 */
export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  address: z.string(),
  phone: z.number().optional(),
  role: z.string().min(4).max(5).optional()
})

export type CreateUserBody = z.infer<typeof createUserSchema>
