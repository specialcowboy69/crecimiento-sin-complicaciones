"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

export function LeadSuccess({ children }: { children: React.ReactNode }) {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    statusRef.current?.focus();
  }, []);

  return (
    <div className="lead-success" ref={statusRef} role="status" aria-live="polite" tabIndex={-1}>
      <CheckCircle2 size={28} aria-hidden="true" />
      <h3>Solicitud enviada</h3>
      <p>{children}</p>
    </div>
  );
}
