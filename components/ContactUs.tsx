
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconMailQuestion, IconPhone, IconMapPin, IconMail } from './icons';
import ContactForm from './ContactForm';

const ContactUs = () => {
  return (
    <Card className="w-full">
        <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-extrabold text-primary">Get in Touch</CardTitle>
            <CardDescription className="max-w-3xl mx-auto text-lg">
                Have a question or want to work with us? We'd love to hear from you.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="order-2 lg:order-1">
                    <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                        <IconMailQuestion className="h-6 w-6" /> Send Us a Message
                    </h3>
                    <ContactForm />
                </div>
                
                {/* Contact Info & Image */}
                <div className="order-1 lg:order-2 space-y-6">
                     <img
                        src="https://images.unsplash.com/photo-1541133261239-093717435532?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Modern office lobby"
                        className="rounded-lg shadow-lg object-cover w-full h-64"
                     />
                     <div className="space-y-4 text-lg">
                        <div className="flex items-start gap-4">
                            <IconMapPin className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Our Office</h4>
                                <p className="text-muted-foreground">123 AI Avenue, Suite 100, Tech City, USA 90210</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <IconMail className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Email Us</h4>
                                <a href="mailto:contact@talentflow.ai" className="text-muted-foreground hover:text-primary transition-colors">contact@talentflow.ai</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <IconPhone className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                             <div>
                                <h4 className="font-semibold">Call Us</h4>
                                <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">+1 (555) 123-4567</a>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default ContactUs;
