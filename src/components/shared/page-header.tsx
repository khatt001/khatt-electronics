import { Container } from "@/components/layout/container";

export function PageHeader({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="panel-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative py-14 md:py-20">
        <p className="eyebrow text-brass">{eyebrow}</p>
        <h1 className="mt-5 max-w-[22ch] font-display text-4xl leading-[1.08] font-medium md:text-[3.4rem]">{title}</h1>
        {text ? <p className="mt-6 max-w-[64ch] leading-8 text-white/70">{text}</p> : null}
        {children}
      </Container>
    </section>
  );
}
