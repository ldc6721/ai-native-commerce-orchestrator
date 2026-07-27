import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">Stage 2B Frontend Scaffold</p>
          <h1 className="mt-3 text-4xl font-semibold">AI Native Commerce</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Frontend shell is ready for scaffold validation.
          </p>
        </section>
      </main>
    </QueryClientProvider>
  );
}
