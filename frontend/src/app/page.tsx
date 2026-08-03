import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-2xl w-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-background font-bold text-xl">
            A
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Anya</h1>
        </div>

        <p className="text-xl text-gray-400">
          Backend-as-an-Agent. Connect your frontend repo, and Anya will
          automatically generate and maintain your backend.
        </p>

        <div className="w-full bg-surface p-6 rounded-xl border border-gray-800 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Get Started</h2>
          <p className="text-gray-400">
            Connect your GitHub account to let Anya analyze your frontend
            codebase.
          </p>
          <button className="bg-primary hover:bg-primary-hover text-background font-medium py-3 px-6 rounded-lg transition-colors w-full sm:w-auto">
            Connect GitHub
          </button>
        </div>

        <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-800 rounded-lg">
            <h3 className="font-medium text-lg mb-2">1. Connect Repo</h3>
            <p className="text-sm text-gray-500">
              Anya reads your frontend code to understand your data models and
              API needs.
            </p>
          </div>
          <div className="p-4 border border-gray-800 rounded-lg">
            <h3 className="font-medium text-lg mb-2">2. Review Backend</h3>
            <p className="text-sm text-gray-500">
              Review the generated schema, endpoints, and DB guardrails.
            </p>
          </div>
          <div className="p-4 border border-gray-800 rounded-lg">
            <h3 className="font-medium text-lg mb-2">3. Auto-Updates</h3>
            <p className="text-sm text-gray-500">
              Push changes to your frontend, and Anya updates the backend
              automatically.
            </p>
          </div>
          <div className="p-4 border border-gray-800 rounded-lg">
            <h3 className="font-medium text-lg mb-2">4. Deploy</h3>
            <p className="text-sm text-gray-500">
              Your backend runs as normal, deterministic server code.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-24 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600">
        <Link href="#" className="hover:text-gray-300 transition-colors">
          Documentation
        </Link>
        <Link href="#" className="hover:text-gray-300 transition-colors">
          Terms
        </Link>
        <Link href="#" className="hover:text-gray-300 transition-colors">
          Privacy
        </Link>
        {/* Premium features hidden away in the footer */}
        <Link
          href="#"
          className="hover:text-gray-300 transition-colors opacity-50 hover:opacity-100"
        >
          Pro
        </Link>
      </footer>
    </div>
  );
}
