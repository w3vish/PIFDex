import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import Form from "./Form"

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with the team at InfiniteFusion.org. Reach out to us via our contact form, email, or phone. We’re here to help you with any inquiries.",
    keywords: ["contact", "infinite fusion", "get in touch", "pokemon fusion", "support", "email", "phone"],
    robots: "index, follow",
    openGraph: {
        title: "Contact Us",
        description: "Have questions or need help? Contact InfiniteFusion.org via our form, email, or phone.",
        url: "https://infinitefusion.org/contact",
        type: "website",
    }
}


export default function ContactPage() {
    return (
        <main className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Get in Touch</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Feel free to contact us using the form below or reach out via email or phone.
                </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
                <Card>
                    <CardContent className="space-y-2">
                        <h3 className="text-xl font-bold">Contact Information</h3>
                        <div className="flex flex-col space-y-2">
                            {/* Address */}
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>1234 Elm Street, Springfield, IL, 62704</span>
                            </div>
                            {/* Phone */}
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>(871) 540-6263</span>
                            </div>
                            {/* Email */}
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <Link href="mailto:w3vish@gmail.com" prefetch={false} className="hover:underline">
                                    w3vish@gmail.com
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Input Form */}
                <Form />

            </div>
        </main>
    )
}
