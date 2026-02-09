import { Award, Clock, Users, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Accredited & Certified',
    description:
      'Our laboratory is accredited to international standards, ensuring reliable and recognized test results.',
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    description:
      'We understand time is critical. Our efficient processes deliver accurate results without unnecessary delays.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description:
      'Our experienced technicians and engineers bring decades of combined expertise in cable testing.',
  },
  {
    icon: TrendingUp,
    title: 'Advanced Equipment',
    description:
      'State-of-the-art testing equipment and methodologies ensure precision and compliance with latest standards.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Us</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trusted by manufacturers and suppliers across the industry for quality and reliability.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{reason.title}</h3>
                <p className="mt-2 text-muted-foreground">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
