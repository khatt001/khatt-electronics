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
    <section className="bg-ink text-white">
      <Container className="py-12 md:py-16">
        <p className="eyebrow text-white/60">{eyebrow}</p>
        <h1 className="mt-3 max-w-[26ch] text-3xl leading-[1.15] font-bold md:text-[2.75rem]">{title}</h1>
        {text ? <p className="mt-5 max-w-[66ch] leading-7 text-white/70">{text}</p> : null}
        {children}
      </Container>
    </section>
  );
}
