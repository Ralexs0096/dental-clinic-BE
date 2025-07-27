import z from 'zod'
import { userSchema } from '../users/response'

const userWithoutId = userSchema.omit({ id: true, role: true })

/**
 * **************** /signup ****************
 */
export const signUpSchemaBody = z.object({
  ...userWithoutId.shape,
  password: z.string().min(8)
})

export type SignUpBody = z.infer<typeof signUpSchemaBody>

/**
 * **************** /signin ****************
 */
export const signInSchemaBody = z.object({
  email: z.string(),
  password: z.string().min(8)
})

export type SignInBody = z.infer<typeof signInSchemaBody>
