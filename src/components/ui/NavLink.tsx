import { cn } from "@/lib/utils";

interface Props {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function NavLink({ href, label, onClick, className }: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-block h-5 overflow-hidden text-sm font-medium tracking-wide text-white/90",
        className,
      )}
    >
      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="h-5 leading-5">{label}</span>
        <span className="h-5 leading-5 text-white">{label}</span>
      </span>
    </a>
  );
}
