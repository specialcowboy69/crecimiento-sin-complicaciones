import Link from "next/link";
import { ChevronDown } from "lucide-react";

const serviceLinks = [
  {
    href: "/seo",
    label: "Agencia SEO",
    helper: "Auditoría, arquitectura y contenido para captar desde Google.",
  },
  {
    href: "/seo-para-pymes",
    label: "SEO para pymes",
    helper: "Prioridades SEO claras para empresas pequeñas.",
  },
  {
    href: "/agencia-marketing-digital/google-ads",
    label: "Google Ads",
    helper: "Campañas medibles para captar leads sin desperdiciar presupuesto.",
  },
  {
    href: "/diseno-landing-pages",
    label: "Landing pages",
    helper: "Páginas de campaña para convertir visitas en leads.",
  },
  {
    href: "/diseno-pagina-web-profesional",
    label: "Diseño web",
    helper: "Webs rápidas orientadas a convertir visitas en clientes.",
  },
  {
    href: "/gestion-redes-sociales-empresas",
    label: "Redes sociales",
    helper: "Contenido, vídeo y calendario para vender con más claridad.",
  },
  {
    href: "/soluciones-inteligencia-artificial-empresas",
    label: "IA empresas",
    helper: "Automatizaciones y agentes aplicados a procesos reales.",
  },
  {
    href: "/agencia-marketing-digital",
    label: "Marketing digital",
    helper: "Web, SEO, Ads, redes, CRO, analítica e IA conectadas.",
  },
];

type LandingServicesMenuProps = {
  currentPath: string;
  allowedHrefs?: readonly string[];
  label?: string;
};

export function LandingServicesMenu({ currentPath, allowedHrefs, label = "Más servicios" }: LandingServicesMenuProps) {
  const links = (allowedHrefs
    ? allowedHrefs
        .map((href) => serviceLinks.find((link) => link.href === href))
        .filter((link): link is (typeof serviceLinks)[number] => Boolean(link))
    : serviceLinks
  ).filter((link) => link.href !== currentPath);

  return (
    <details className="landing-services-menu">
      <summary>
        {label}
        <ChevronDown className="landing-services-chevron" size={16} strokeWidth={2.2} aria-hidden="true" />
      </summary>
      <div className="landing-services-dropdown">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <span className="landing-services-label">{link.label}</span>
            <span className="landing-services-helper">{link.helper}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
