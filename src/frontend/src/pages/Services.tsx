import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceGroups from '@/components/sections/ServiceGroups';

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Our Testing Services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Comprehensive testing solutions for electric cables, wires, and conductors. Our
              accredited laboratory ensures your products meet all required standards and
              specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Service Groups */}
      <ServiceGroups />

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Need a Custom Testing Solution?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our team can design specialized testing protocols to meet your specific requirements.
            </p>
            <div className="mt-8">
              <Link to="/book-a-test">
                <Button size="lg">
                  Book a Test
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
