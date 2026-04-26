export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-semibold mb-6 text-black dark:text-zinc-50">
          About
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 text-center">
          This is a new page. You can customize this content as needed.
        </p>
      </main>
    </div>
  );
}

