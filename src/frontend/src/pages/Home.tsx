import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, Clock, Shield, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ServicesHighlight from '@/components/sections/ServicesHighlight';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/sanwariya-hero.dim_1920x800.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome To <span className="text-primary">SANWARIYA TESTING LAB LLP</span>
            </h1>
            <div className="mt-6 space-y-3 text-lg text-muted-foreground sm:text-xl md:text-2xl">
              <p className="font-semibold">Wires | Cables | Conductors | Conduits</p>
              <p>IS/1SO/IEC 17025:2017 NABL Accredited</p>
              <p>ISO 9001:2015 Certified Testing Laboratory</p>
              <p>Recognized by: Bureau of Indian Standards (BIS).</p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/book-a-test">
                <Button size="lg" className="w-full sm:w-auto text-base font-semibold">
                  Book a Test
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base font-semibold"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Your Trusted Testing Partner
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Sanwariya Testing Lab LLP is a state-of-the-art facility specializing in electrical
              cable, wire, and conductor testing. We provide accurate, reliable results backed by
              industry-leading expertise and cutting-edge equipment.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: 'Accredited Lab',
                description: 'Certified testing facility meeting international standards',
              },
              {
                icon: CheckCircle2,
                title: 'Accurate Results',
                description: 'Precision testing with advanced equipment and methodology',
              },
              {
                icon: Clock,
                title: 'Fast Turnaround',
                description: 'Quick processing without compromising quality',
              },
              {
                icon: FileCheck,
                title: 'Detailed Reports',
                description: 'Comprehensive documentation for compliance and quality assurance',
              },
            ].map((feature, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <ServicesHighlight />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* CTA Section */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Book your testing service today or get in touch with our team for more information.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/book-a-test">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a Test
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
