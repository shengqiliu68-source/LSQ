export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#181818]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-[#d8d0c2] pb-5">
          <div className="text-xl font-semibold">LSQ</div>
          <div className="text-sm text-[#62584c]">Global Trade Website</div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#8a5a22]">
              Ready for AI website development
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
              Build a clear, trusted website for international buyers.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f5a52]">
              This project is prepared for fast iteration with Next.js, TypeScript, Tailwind CSS,
              GitHub, and Codex.
            </p>
          </div>

          <div className="border border-[#d8d0c2] bg-white p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-medium text-[#62584c]">Project Status</span>
              <span className="border border-[#b8a98f] px-3 py-1 text-xs font-semibold text-[#5d3b13]">
                Ready
              </span>
            </div>
            <dl className="grid gap-5 text-sm">
              <div className="flex items-center justify-between border-b border-[#eee8dc] pb-4">
                <dt className="text-[#6f675d]">Framework</dt>
                <dd className="font-medium">Next.js</dd>
              </div>
              <div className="flex items-center justify-between border-b border-[#eee8dc] pb-4">
                <dt className="text-[#6f675d]">Styling</dt>
                <dd className="font-medium">Tailwind CSS</dd>
              </div>
              <div className="flex items-center justify-between border-b border-[#eee8dc] pb-4">
                <dt className="text-[#6f675d]">Language</dt>
                <dd className="font-medium">TypeScript</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[#6f675d]">Repository</dt>
                <dd className="font-medium">GitHub synced</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
