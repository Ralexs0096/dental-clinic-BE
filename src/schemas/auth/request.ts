import z from 'zod'
import { userSchema } from '../users/response'

const userWithoutId = userSchema.omit({ id: true, role: true })

export const singUpSchema = z.object({
  ...userWithoutId.shape,
  password: z.string().min(8)
})

export type SignUpBody = z.infer<typeof singUpSchema>
