type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const primaryText = variant === "dark" ? "text-white" : "text-slate-900";
  const secondaryText = variant === "dark" ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`site-logo flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 9c-2.5 0-3 2-3 3s0.5 3 3 3" />
          <path d="M17 9.5c-2 0-3.5 1-3 2.5s3 1.5 3 3-2 2-3.5 1.5" />
        </svg>
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-blue-600" />
      </div>

      <div className="site-logo-text flex flex-col">
        <span className={`text-base font-extrabold leading-tight tracking-normal ${primaryText}`}>
          Crecimiento <span className={`font-normal ${secondaryText}`}>Sin Complicaciones</span>
        </span>
      </div>
    </div>
  );
}
