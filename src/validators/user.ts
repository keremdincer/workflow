import * as z from 'zod'

export const registerValidator = z
  .object({
    email: z.string().email({ message: 'Invalid email address.' }),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    confirm: z.string()
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords Don't match.",
    path: ['confirm']
  })


export const loginValidator = z
  .object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string()
  })