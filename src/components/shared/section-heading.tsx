import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: "light" | "dark";
  action?: React.ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, tone = "light", action, className }: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl min-w-0">
        <p className={cn("eyebrow", dark ? "text-brass" : "text-signal")}>{eyebrow}</p>
        <h2 className={cn("mt-4 font-display text-3xl leading-[1.12] font-medium md:text-[2.75rem]", dark ? "text-white" : "text-ink")}>
          {title}
        </h2>
        {text ? (
          <p className={cn("mt-5 max-w-[62ch] text-base leading-7", dark ? "text-white/65" : "text-muted")}>{text}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
