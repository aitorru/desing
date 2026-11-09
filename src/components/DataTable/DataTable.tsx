import { type ReactNode, useMemo, useState } from "react";
import { cx } from "../cx";
import "./DataTable.css";

export interface DataTableColumn<T> {
  /** Unique id; also the property read from the row when there is no `cell`. */
  key: string;
  header: ReactNode;
  /** Custom cell. Defaults to `row[key]`. */
  cell?: (row: T) => ReactNode;
  /** Figures: right-aligned, monospaced and tabular, so digits line up down the column. */
  numeric?: boolean;
  /** Machine text (ids, versions, hashes) in the mono face, left-aligned. */
  mono?: boolean;
  align?: "start" | "end";
  /** Makes the header a sort button. Sorts by `sortValue`, or by `row[key]`. */
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  /** CSS width of the column (`"30%"`, `"120px"`). */
  width?: string;
}

export interface DataTableSort {
  key: string;
  direction: "asc" | "desc";
}

export interface DataTableProps<T> {
  columns: readonly DataTableColumn<T>[];
  rows: readonly T[];
  rowKey: (row: T) => string;
  /** What the table lists. Read by screen readers; shown above it unless `hideCaption`. */
  caption: ReactNode;
  hideCaption?: boolean;
  /** `compact` 36px rows for dense consoles · `regular` 48px. */
  density?: "compact" | "regular";
  defaultSort?: DataTableSort;
  /** Makes rows interactive (hover, pointer, Enter / Space). */
  onRowClick?: (row: T) => void;
  /** Row that carries the accent edge: the selected or the affected one. */
  selectedKey?: string;
  /** Shown instead of the body when there are no rows. */
  empty?: ReactNode;
  className?: string;
}

const read = (row: unknown, key: string): unknown =>
  row != null && typeof row === "object" ? (row as Record<string, unknown>)[key] : undefined;

/**
 * A ruled table for operational data: services, deployments, jobs, hosts. Hairlines
 * instead of zebra stripes, small-caps headers, mono figures. Scrolls sideways on its own
 * when it does not fit.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
  hideCaption = false,
  density = "regular",
  defaultSort,
  onRowClick,
  selectedKey,
  empty = "Sin datos",
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<DataTableSort | undefined>(defaultSort);

  const sorted = useMemo(() => {
    const column = sort && columns.find((c) => c.key === sort.key);
    if (!sort || !column) return rows;
    const value = column.sortValue ?? ((row: T) => read(row, column.key) as string | number);
    const sign = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const x = value(a);
      const y = value(b);
      if (typeof x === "number" && typeof y === "number") return (x - y) * sign;
      return String(x).localeCompare(String(y), undefined, { numeric: true }) * sign;
    });
  }, [rows, columns, sort]);

  const toggle = (key: string) =>
    setSort((s) =>
      s?.key === key
        ? { key, direction: s.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );

  return (
    <div className={cx("pt-table", `pt-table--${density}`, className)}>
      <table className="pt-table__table">
        <caption className={hideCaption ? "pt-sr-only" : "pt-table__caption"}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key ? sort.direction : undefined;
              const end = c.align ? c.align === "end" : c.numeric;
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={cx("pt-table__th", end && "is-end")}
                  style={c.width ? { width: c.width } : undefined}
                  aria-sort={
                    c.sortable
                      ? active === "asc"
                        ? "ascending"
                        : active === "desc"
                          ? "descending"
                          : "none"
                      : undefined
                  }
                >
                  {c.sortable ? (
                    <button
                      type="button"
                      className="pt-table__sort pt-focusable"
                      onClick={() => toggle(c.key)}
                    >
                      {c.header}
                      <span
                        className={cx("pt-table__arrow", active && `is-${active}`)}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td className="pt-table__empty" colSpan={columns.length}>
                {empty}
              </td>
            </tr>
          )}
          {sorted.map((row) => {
            const key = rowKey(row);
            return (
              <tr
                key={key}
                className={cx(
                  "pt-table__row",
                  onRowClick && "is-interactive",
                  key === selectedKey && "is-selected",
                )}
                aria-selected={selectedKey == null ? undefined : key === selectedKey}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRowClick(row);
                        }
                      }
                    : undefined
                }
              >
                {columns.map((c) => {
                  const end = c.align ? c.align === "end" : c.numeric;
                  return (
                    <td
                      key={c.key}
                      className={cx(
                        "pt-table__td",
                        end && "is-end",
                        (c.numeric || c.mono) && "pt-mono",
                      )}
                    >
                      {c.cell ? c.cell(row) : (read(row, c.key) as ReactNode)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
