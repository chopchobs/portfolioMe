import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-clay-text">
        404
      </p>
      <h1 className="text-4xl font-normal sm:text-5xl">Page not found</h1>
      <p className="mt-5 max-w-md text-lg text-slate">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="mt-10">
        <Button href="/">Back to home</Button>
      </div>
    </main>
  );
}
