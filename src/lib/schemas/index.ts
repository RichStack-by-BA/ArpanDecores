import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(5, "Message must be at least 5 characters"),
})

export type ContactFormValues = z.infer<typeof contactSchema>


export const addressSchema = z.object({
  name: z.string().trim().min(1, 'Full name is required'),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter valid Indian phone number'),

  addressLine1: z.string().trim().min(1, 'Address is required'),

  city: z.string().trim().min(1, 'City is required'),

  state: z.string().trim().min(1, 'State is required'),

  postalCode: z
    .string()
    .regex(/^\d{6}$/, 'Postal code must be 6 digits'),

  isDefault: z.boolean().optional(),

  addressType: z.enum(['HOME', 'WORK', 'OTHER'] as const, {
    error: 'Address type is required',
  }),
})

export type AddressFormValues = z.infer<typeof addressSchema>
