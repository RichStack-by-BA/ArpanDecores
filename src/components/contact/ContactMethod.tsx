import { Phone, Mail, Clock } from "lucide-react"

type ContactMethodProps = {
    icon: "phone" | "mail" | "clock"
    label: string
    value: string
}

const icons = {
    phone: <Phone className="h-5 w-5 text-primary" />,
    mail: <Mail className="h-5 w-5 text-primary" />,
    clock: <Clock className="h-5 w-5 text-primary" />,
}

const ContactMethod: React.FC<ContactMethodProps> = ({ icon, label, value }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                {icons[icon]}
            </div>
            <div>
                <div className="font-medium">{label}</div>
                <div className="text-sm text-muted-foreground">{value}</div>
            </div>
        </div>
    )
}

export default ContactMethod
