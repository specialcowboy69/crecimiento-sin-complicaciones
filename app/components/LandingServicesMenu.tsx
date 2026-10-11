"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

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
  mobileAuditHref?: string;
};

export function LandingServicesMenu({ currentPath, allowedHrefs, label = "Más servicios", mobileAuditHref }: LandingServicesMenuProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOnOutside(event: PointerEvent) {
      if (menuRef.current?.open && !menuRef.current.contains(event.target as Node)) {
        menuRef.current.open = false;
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const links = (allowedHrefs
    ? allowedHrefs
        .map((href) => serviceLinks.find((link) => link.href === href))
        .filter((link): link is (typeof serviceLinks)[number] => Boolean(link))
    : serviceLinks
  ).filter((link) => link.href !== currentPath);

  return (
    <>
    {mobileAuditHref ? (
      <a className="mobile-audit-cta" href={mobileAuditHref} aria-label="Solicitar auditoría gratuita">
        Auditoría gratuita
      </a>
    ) : null}
    <details className="landing-services-menu" ref={menuRef}>
      <summary>
        <span className="landing-services-desktop-label">{label}</span>
        <span className="landing-services-mobile-label">Servicios</span>
        <ChevronDown className="landing-services-chevron" size={16} strokeWidth={2.2} aria-hidden="true" />
      </summary>
      <div className="landing-services-dropdown">
        {links.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>
            <span className="landing-services-label">{link.label}</span>
            <span className="landing-services-helper">{link.helper}</span>
          </Link>
        ))}
      </div>
    </details>
    </>
  );
}
