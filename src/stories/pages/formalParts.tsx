import type { ReactNode } from "react";
import { Button, DotMark, DotPattern } from "../../index";

const LINKS = ["Resumen", "Servicios", "Incidentes", "Guardias"];

export function Masthead({
  current,
  links = LINKS,
  issue = "Semana 45 · 2026",
  end,
}: {
  current: string;
  links?: readonly string[];
  issue?: ReactNode;
  /** Replaces the default button at the end of the bar. */
  end?: ReactNode;
}) {
  return (
    <>
      <header className="fm-mast fm-gutter">
        <span className="fm-mast__brand">
          <DotMark size={18} />
          plataforma
        </span>
        <nav className="fm-mast__links" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              aria-current={l === current ? "page" : undefined}
            >
              {l}
            </a>
          ))}
        </nav>
        {issue != null && <span className="pt-folio fm-mast__issue">{issue}</span>}
        {end ?? (
          <Button variant="ghost" size="sm">
            Runbooks
          </Button>
        )}
      </header>
      <hr className="pt-rule" />
    </>
  );
}

export function Colophon() {
  return (
    <footer className="fm-foot fm-gutter">
      <div className="fm-foot__strip">
        <DotPattern motif="grid" falloff={0} intensity={0.34} highlight={0} origin="left" />
      </div>
      <div className="fm-foot__line">
        <span>Equipo de plataforma · hecho con Punto 2</span>
        <span>Compuesto en Geist y Geist Mono</span>
      </div>
    </footer>
  );
}
