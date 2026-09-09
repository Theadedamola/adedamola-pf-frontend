export interface ExperiencePillProps {
  name: string;
  iconBg?: string;
  href?: string;
  className?: string;
}

export function ExperiencePill({
  name,
  iconBg = "bg-blue-600",
  href,
  className = "",
}: ExperiencePillProps) {
  const pillContent = (
    <span
      className={`inline-flex items-center gap-1.5 pl-2 pr-2.5 py-0.5 mx-1 rounded-full bg-neutral-100 hover:bg-neutral-200/90 border border-neutral-200/90 text-neutral-800 font-medium text-[0.92em] align-baseline -translate-y-px transition-all duration-150 cursor-pointer select-none group shadow-2xs ${className}`}
    >
      <span
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] ${iconBg} shrink-0 shadow-2xs`}
      />
      <span className="text-neutral-800 group-hover:text-black leading-none whitespace-nowrap">
        {name.toLowerCase()}
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-transform active:scale-95"
      >
        {pillContent}
      </a>
    );
  }

  return pillContent;
}

export default ExperiencePill;
