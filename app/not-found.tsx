import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <p className="text-sm font-black uppercase text-teal-700">Error 404</p>
      <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="max-w-xl text-lg leading-8 text-slate-600">
        La dirección que buscas no está disponible.
      </p>
      <Link
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
        href="/"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
