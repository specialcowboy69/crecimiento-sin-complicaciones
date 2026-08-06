import Link from "next/link";

const pages = [
  { href: "/", label: "Inicio" },
  { href: "/diseno-pagina-web-profesional", label: "Diseno web" },
  { href: "/gestion-redes-sociales-empresas", label: "Redes sociales" },
  { href: "/soluciones-inteligencia-artificial-empresas", label: "IA empresas" },
];

type PageLinksNavProps = {
  currentPath: string;
  variant?: "light" | "dark";
};

export function PageLinksNav({ currentPath, variant = "dark" }: PageLinksNavProps) {
  const isDark = variant === "dark";
  const links = pages.filter((page) => page.href !== currentPath);

  return (
    <nav
      className={`border-b px-4 py-4 sm:px-6 lg:px-8 ${
        isDark ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"
      }`}
      aria-label="Paginas principales"
    >
      <div className="mx-auto flex max-w-7xl justify-center">
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((page) => (
            <Link
              className={`rounded-full px-3 py-2 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isDark
                  ? "bg-white/5 text-slate-200 ring-1 ring-white/10 hover:bg-blue-600 hover:text-white"
                  : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-blue-600 hover:text-white"
              }`}
              href={page.href}
              key={page.href}
            >
              {page.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
