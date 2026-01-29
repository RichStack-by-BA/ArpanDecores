"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"

import { Send } from "lucide-react"
import { addContact } from "@/lib/api/contact"
import { use } from "react"
import { useDispatch } from "react-redux"
import { pushToast } from "@/store/slices/toastSlice"
import { makeId } from "@/lib/utils"

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(5, "Message should be at least 5 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactForm({ contactFormFields }: { contactFormFields: any }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })
  const dispatch = useDispatch();

  const onSubmit = async (data: ContactFormValues) => {
    const res = await addContact(data);
    if (res.ok) {
      reset();
      dispatch(pushToast({
        id: makeId(), variant: "success", title: "Message Sent",
        message: "Your contact request has been submitted successfully."
      }))
    } else {
      dispatch(pushToast({
        id: makeId(), variant: "error", title: "Submission Failed",
        message: "Something went wrong. Please try again."
      }))
    }

  };

  const handleSubjectChange = (value: string) => {
    setValue("subject", value, { shouldValidate: true });
  };
  const subjectValue = watch("subject");


  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Send us a Message
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Full Name *
            </label>
            <Input
              {...register("name")}
              placeholder="Your full name"
              className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email Address *
            </label>
            <Input
              {...register("email")}
              placeholder="your@email.com"
              className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Phone + Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Phone Number *
            </label>
            <Input
              {...register("phone")}
              placeholder="+91 98765 43210"
              className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Subject *
            </label>
            <Select
              options={contactFormFields}
              value={subjectValue}
              onChange={handleSubjectChange}
              placeholder="Select a subject"
            />
            {errors.subject && (
              <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Message *
          </label>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your requirements..."
            rows={5}
            className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
          {errors.message && (
            <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Send size={18} />
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}
