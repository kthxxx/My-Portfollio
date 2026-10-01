import type { ReactNode } from "react";

export function Tooltip({ children, label }: { children: ReactNode; label: string }) {
  return (
    <span className="ui-tooltip-wrap">
      {children}
      <span className="ui-tooltip" role="tooltip">{label}</span>
    </span>
  );
}
