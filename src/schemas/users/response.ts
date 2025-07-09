import { z } from 'zod'

export const createdUserSchema = z.object({
  id: z.number(),
  name: z.string()
})
