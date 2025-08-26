import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"

type ContactFormProps = {
    formData: {
        name: string
        email: string
        phone: string
        subject: string
        message: string
    }
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSubjectChange: (value: string) => void
    handleSubmit: (e: React.FormEvent) => void
    isSubmitting: boolean
    formFields: any[]
}

const ContactForm: React.FC<ContactFormProps> = ({
    formData,
    handleInputChange,
    handleSubjectChange,
    handleSubmit,
    isSubmitting,
    formFields,
}) => {
    return (
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant">
            <h2 className="heading-md mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field) => {
                    if (field.type === "select") {
                        return (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                                    {field.label} *
                                </label>
                                <Select
                                    options={field.options}
                                    value={formData.subject}
                                    onChange={handleSubjectChange}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        )
                    }

                    if (field.type === "textarea") {
                        return (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                                    {field.label} *
                                </label>
                                <Textarea
                                    id={field.name}
                                    name={field.name}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder={field.placeholder}
                                    rows={6}
                                />
                            </div>
                        )
                    }

                    return (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                                {field.label} *
                            </label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleInputChange}
                                required
                                placeholder={field.placeholder}
                            />
                        </div>
                    )
                })}
                <Button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
            </form>
        </div>
    )
}

export default ContactForm
