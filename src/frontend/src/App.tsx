import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Home from './pages/Home';
import Services from './pages/Services';
import BookATest from './pages/BookATest';
import ContactUs from './pages/ContactUs';
import TestRequestsList from './pages/internal/TestRequestsList';
import ContactSubmissionsList from './pages/internal/ContactSubmissionsList';
import SiteLayout from './components/layout/SiteLayout';
import AdminGuard from './components/auth/AdminGuard';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: Services,
});

const bookATestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book-a-test',
  component: BookATest,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactUs,
});

const testRequestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/internal/test-requests',
  component: () => (
    <AdminGuard>
      <TestRequestsList />
    </AdminGuard>
  ),
});

const contactSubmissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/internal/contact-submissions',
  component: () => (
    <AdminGuard>
      <ContactSubmissionsList />
    </AdminGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  bookATestRoute,
  contactRoute,
  testRequestsRoute,
  contactSubmissionsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
