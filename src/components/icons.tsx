import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a3.5 3.5 0 0 0-3.5 3.5v.5a3.5 3.5 0 0 0 7 0v-.5A3.5 3.5 0 0 0 12 2Z" />
      <path d="M12 9s-4.5 3-4.5 6v2.5" />
      <path d="M12 9s4.5 3 4.5 6v2.5" />
      <path d="M12 22a2.5 2.5 0 0 1-2.5-2.5" />
      <path d="M12 22a2.5 2.5 0 0 0 2.5-2.5" />
      <path d="M5 12.5a2.5 2.5 0 0 1-2.5-2.5" />
      <path d="M5 12.5a2.5 2.5 0 0 0 2.5-2.5" />
      <path d="M19 12.5a2.5 2.5 0 0 0 2.5-2.5" />
      <path d="M19 12.5a2.5 2.5 0 0 1-2.5-2.5" />
    </svg>
  );
}
