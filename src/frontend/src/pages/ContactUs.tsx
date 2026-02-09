import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { COMPANY_INFO, getFullAddress } from '@/lib/companyInfo';
import { useSubmitContactForm } from '@/hooks/useQueries';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const submitMutation = useSubmitContactForm();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitMutation.mutateAsync({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message,
      });

      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    }
  };

  if (submitted) {
    return (
      <div className="container py-16 md:py-24">
        <Card className="mx-auto max-w-2xl border-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Message Sent Successfully!</CardTitle>
            <CardDescription className="text-base">
              Thank you for contacting us. We will get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get in touch with our team for inquiries, support, or to learn more about our testing
              services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="mt-2 text-muted-foreground">
                We're here to help. Reach out to us through any of the following channels.
              </p>

              <div className="mt-8 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">Our Location</CardTitle>
                        <CardDescription className="mt-2">
                          <address className="not-italic">{getFullAddress()}</address>
                        </CardDescription>
                        <a
                          href={COMPANY_INFO.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          View on Google Maps
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Email Us</CardTitle>
                        <CardDescription className="mt-2">
                          <a
                            href={`mailto:${COMPANY_INFO.email}`}
                            className="hover:text-foreground transition-colors"
                          >
                            {COMPANY_INFO.email}
                          </a>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Call Us</CardTitle>
                        <CardDescription className="mt-2 space-y-1">
                          {COMPANY_INFO.phones.map((phone) => (
                            <div key={phone}>
                              <a
                                href={`tel:${phone}`}
                                className="hover:text-foreground transition-colors"
                              >
                                {phone}
                              </a>
                            </div>
                          ))}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm font-medium">GSTIN</p>
                  <p className="mt-1 text-sm text-muted-foreground">{COMPANY_INFO.gstin}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll respond as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone and Email */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone', { required: 'Phone number is required' })}
                          placeholder="Enter your phone"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        {...register('message', { required: 'Message is required' })}
                        placeholder="How can we help you?"
                        rows={6}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Error Alert */}
                    {submitMutation.isError && (
                      <Alert variant="destructive">
                        <AlertDescription>
                          Failed to send your message. Please try again or contact us directly.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
