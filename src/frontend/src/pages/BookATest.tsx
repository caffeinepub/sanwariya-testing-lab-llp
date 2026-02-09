import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSubmitTestRequest } from '@/hooks/useQueries';

interface BookTestFormData {
  customerName: string;
  company: string;
  phone: string;
  email: string;
  testItemType: string;
  standards: string;
  message: string;
  preferredDate: string;
}

export default function BookATest() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<BookTestFormData>();
  const submitMutation = useSubmitTestRequest();

  const testItemType = watch('testItemType');

  const onSubmit = async (data: BookTestFormData) => {
    try {
      const preferredDateMs = data.preferredDate
        ? BigInt(new Date(data.preferredDate).getTime() * 1_000_000)
        : null;

      await submitMutation.mutateAsync({
        customerName: data.customerName,
        company: data.company || null,
        phone: data.phone,
        email: data.email || null,
        testItemType: data.testItemType,
        standards: data.standards || null,
        message: data.message || null,
        preferredDate: preferredDateMs,
      });

      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Failed to submit test request:', error);
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
            <CardTitle className="text-2xl">Request Submitted Successfully!</CardTitle>
            <CardDescription className="text-base">
              Thank you for choosing Sanwariya Testing Lab. We have received your testing request
              and will contact you shortly to confirm the details.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setSubmitted(false)}>Submit Another Request</Button>
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Book a Test</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill out the form below to request testing services. Our team will review your
              requirements and contact you to confirm the details.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle>Testing Request Form</CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us prepare for your testing
                requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Customer Name */}
                <div className="space-y-2">
                  <Label htmlFor="customerName">
                    Customer Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    {...register('customerName', { required: 'Customer name is required' })}
                    placeholder="Enter your full name"
                  />
                  {errors.customerName && (
                    <p className="text-sm text-destructive">{errors.customerName.message}</p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name (Optional)</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder="Enter your company name"
                  />
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
                      placeholder="Enter your phone number"
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

                {/* Test Item Type */}
                <div className="space-y-2">
                  <Label htmlFor="testItemType">
                    Test Item Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('testItemType', value)}
                    value={testItemType}
                  >
                    <SelectTrigger id="testItemType">
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cable">Electric Cable</SelectItem>
                      <SelectItem value="wire">Wire</SelectItem>
                      <SelectItem value="conductor">Conductor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register('testItemType', { required: 'Test item type is required' })}
                  />
                  {errors.testItemType && (
                    <p className="text-sm text-destructive">{errors.testItemType.message}</p>
                  )}
                </div>

                {/* Standards */}
                <div className="space-y-2">
                  <Label htmlFor="standards">Standards / Requirements (Optional)</Label>
                  <Input
                    id="standards"
                    {...register('standards')}
                    placeholder="e.g., IS 694, IEC 60227, etc."
                  />
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Testing Date (Optional)</Label>
                  <Input id="preferredDate" type="date" {...register('preferredDate')} />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Additional Details <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    {...register('message', { required: 'Please provide additional details' })}
                    placeholder="Describe your testing requirements, sample quantity, special instructions, etc."
                    rows={5}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {/* Error Alert */}
                {submitMutation.isError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Failed to submit your request. Please try again or contact us directly.
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
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
