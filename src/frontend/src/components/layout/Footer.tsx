import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, getFullAddress } from '@/lib/companyInfo';
import { USER_LOGO_PATH } from '@/lib/branding';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={USER_LOGO_PATH}
                alt={`${COMPANY_INFO.name} Logo`}
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-lg font-bold">{COMPANY_INFO.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Accredited testing laboratory for electric cables, wires, and conductors. Ensuring
              quality and compliance with industry standards.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <address className="not-italic text-muted-foreground">{getFullAddress()}</address>
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    View on Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              {COMPANY_INFO.phones.map((phone) => (
                <div key={phone} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <a
                    href={`tel:${phone}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">GSTIN: {COMPANY_INFO.gstin}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link
                to="/book-a-test"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Book a Test
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5">
            © 2026. Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
