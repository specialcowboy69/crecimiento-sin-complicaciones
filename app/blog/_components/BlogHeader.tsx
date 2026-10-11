import Link from "next/link";

import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { Logo } from "../../components/Logo";
import styles from "../blog.module.css";

export function BlogHeader({ showBlogLink = false }: { showBlogLink?: boolean }) {
  return (
    <header className={styles.header}>
      <nav className={styles.headerInner} aria-label="Navegación del blog">
        <Link className="logo-link" href="/" aria-label="Crecimiento sin complicaciones, inicio">
          <Logo variant="light" />
        </Link>
        <div className={styles.headerActions}>
          {showBlogLink ? <Link href="/blog">Blog</Link> : null}
          <LandingServicesMenu currentPath="/blog" label="Servicios" />
          <Link className={styles.headerCta} href="/#auditoria">
            Auditoría gratuita
          </Link>
        </div>
      </nav>
    </header>
  );
}
