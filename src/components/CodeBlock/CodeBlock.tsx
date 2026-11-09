import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from "react";
import { cx } from "../cx";
import "./CodeBlock.css";

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** The source, as plain text. */
  code: string;
  /** File name or command shown in the header (`deploy.yaml`, `kubectl`). */
  title?: ReactNode;
  /** Language tag at the end of the header. Informative only: nothing is highlighted. */
  language?: string;
  lineNumbers?: boolean;
  /** 1-based lines marked with an accent dot and a tint: the ones the text talks about. */
  highlight?: readonly number[];
  /** Copy button in the header. */
  copyable?: boolean;
  /** Wrap long lines instead of scrolling sideways. */
  wrap?: boolean;
}

/**
 * Source, config or a command, set in the mono face on sunken paper. No syntax colours:
 * emphasis comes from `highlight`, so a block reads the same in every palette.
 */
export function CodeBlock({
  code,
  title,
  language,
  lineNumbers = false,
  highlight,
  copyable = true,
  wrap = false,
  className,
  ...rest
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const lines = code.replace(/\n$/, "").split("\n");
  const marked = new Set(highlight);
  const header = title != null || language != null || copyable;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (insecure origin, permissions): the text stays selectable.
    }
  };

  return (
    <figure className={cx("pt-code", wrap && "pt-code--wrap", className)} {...rest}>
      {header && (
        <figcaption className="pt-code__head">
          <span className="pt-code__title pt-mono">{title}</span>
          {language && <span className="pt-code__lang">{language}</span>}
          {copyable && (
            <button type="button" className="pt-code__copy pt-focusable" onClick={copy}>
              <span aria-live="polite">{copied ? "Copiado" : "Copiar"}</span>
            </button>
          )}
        </figcaption>
      )}
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be reachable by keyboard */}
      <pre className="pt-code__pre" tabIndex={0}>
        <code className="pt-code__code">
          {lines.map((line, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: lines are positional
              key={i}
              className={cx("pt-code__line", marked.has(i + 1) && "is-marked")}
            >
              {lineNumbers && (
                <span className="pt-code__no" aria-hidden="true">
                  {i + 1}
                </span>
              )}
              <span className="pt-code__text">{line || " "}</span>
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
