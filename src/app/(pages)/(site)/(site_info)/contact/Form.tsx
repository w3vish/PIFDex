"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import React from 'react'

function Form() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);
    const { toast } = useToast();

    const resubmit = () => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
    }

    const handleSubmit = (e: any) => {
        e.preventDefault(); // Prevent default form submission

        if (!name || !email || !message) {
            toast({
                title: 'Error',
                description: 'Please fill in all fields',
                variant: 'destructive'
            });
        } else {
            const formData = new FormData();
            formData.append('entry.1611331687', name);
            formData.append('entry.1144327758', message);
            formData.append('emailAddress', email);

            fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdlvyNVN_hIZ7JqN0u68M-s6A3jcHjIiJX06uc_lOvP5hTHDA/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // This is important for Google Forms
            })
                .then(() => {
                    setSubmitted(true);
                    toast({
                        title: 'Success',
                        description: 'Your message has been sent',
                        variant: 'default'
                    });
                })
                .catch((error) => {
                    toast({
                        title: 'Error',
                        description: 'There was an error sending your message',
                        variant: 'destructive'
                    });
                    console.error('Error:', error);
                });
        }
    }

    return (
        <Card>
            <CardHeader>
                <h2 className="my-0 text-2xl font-bold">Send Us a Message</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Email Input */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {/* Message Input */}
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Enter your message"
                            className="min-h-[100px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className='flex gap-4'>
                        <Button type="submit" disabled={submitted}>{submitted ? 'Submitted' : 'Submit'}</Button>
                       {submitted &&  <Button onClick={resubmit}>Resubmit</Button>}

                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Form;
