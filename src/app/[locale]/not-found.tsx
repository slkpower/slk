import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-muted-foreground">Page not found.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
      >
        Home
      </Link>
    </div>
  );
}
