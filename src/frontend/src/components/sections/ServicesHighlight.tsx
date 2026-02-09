import { Zap, Wrench, Microscope, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Zap,
    title: 'Electrical Testing',
    description:
      'Comprehensive electrical performance tests including resistance, insulation, voltage withstand, and conductor continuity.',
  },
  {
    icon: Wrench,
    title: 'Mechanical Testing',
    description:
      'Physical and mechanical property evaluation including tensile strength, elongation, and flexibility tests.',
  },
  {
    icon: Microscope,
    title: 'Material Analysis',
    description:
      'Advanced material testing for insulation properties, thermal stability, and chemical composition analysis.',
  },
  {
    icon: FileText,
    title: 'Compliance Certification',
    description:
      'Full compliance testing and certification against IS, IEC, and other international standards.',
  },
];

export default function ServicesHighlight() {
  return (
    <section className="border-y bg-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Comprehensive Testing Solutions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our laboratory offers a complete range of testing services for cables, wires, and
            conductors.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
