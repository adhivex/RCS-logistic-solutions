import type { Metadata } from "next";
import { Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fleetIntro, hero, trust } from "@/content";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colours = [
  {
    name: "brand-orange",
    hex: "#F2611D",
    use: "Icons, bars, borders, focus, large headings only",
    swatch: "bg-brand-orange",
    note: "3.23:1 with white — not for small text or button fills",
  },
  {
    name: "brand-orange-dark",
    hex: "#D94F10",
    use: "Decorative hover on dark",
    swatch: "bg-brand-orange-dark",
    note: "4.14:1 with white",
  },
  {
    name: "action",
    hex: "#B94A15",
    use: "Button fill, small orange text",
    swatch: "bg-action",
    note: "5.18:1 with white · 4.75:1 on mist",
  },
  {
    name: "action-hover",
    hex: "#A44013",
    use: "Button hover",
    swatch: "bg-action-hover",
    note: "6.32:1 with white",
  },
  {
    name: "brand-ink",
    hex: "#16181D",
    use: "Headings, dark bands, footer",
    swatch: "bg-brand-ink",
    note: "Orange on ink 5.50:1",
  },
  {
    name: "brand-slate",
    hex: "#4A4F58",
    use: "Body text",
    swatch: "bg-brand-slate",
    note: "8.23:1 on white · 7.55:1 on mist",
  },
  { name: "brand-mist", hex: "#F5F5F4", use: "Light section background", swatch: "bg-brand-mist", note: "" },
  {
    name: "brand-line",
    hex: "#E4E4E2",
    use: "Dividers, card borders",
    swatch: "bg-brand-line",
    note: "Decorative only",
  },
  {
    name: "field-border",
    hex: "#8A8F98",
    use: "Form control borders",
    swatch: "bg-field-border",
    note: "3.25:1 on white",
  },
  { name: "danger", hex: "#B42318", use: "Error text", swatch: "bg-danger", note: "6.57:1 on white" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-brand-line py-12">
      <h2 className="mb-8 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="container-site py-12">
      <h1 className="text-4xl font-extrabold">Styleguide</h1>
      <p className="mt-3 max-w-2xl">
        Phase 1 tokens from docs/02-design-system.md. Not indexed. Orange is split into the bright brand
        orange for large and decorative use, and a darker accessible shade for buttons and small text.
      </p>

      <Block title="Colours">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colours.map((colour) => (
            <li key={colour.name} className="overflow-hidden rounded-card border border-brand-line">
              <div className={`h-20 ${colour.swatch}`} />
              <div className="p-4 text-sm">
                <p className="font-semibold text-brand-ink">
                  {colour.name} <span className="font-normal text-brand-slate">{colour.hex}</span>
                </p>
                <p>{colour.use}</p>
                {colour.note && <p className="mt-1 text-xs">{colour.note}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Type scale">
        <div className="grid gap-8">
          <div>
            <p className="mb-2 text-xs tracking-[0.18em] uppercase">
              Hero H1 · Poppins 800 · 52 → 96px · lh .95
            </p>
            <p className="font-display text-[52px] leading-[0.95] font-extrabold tracking-[-0.02em] text-brand-ink md:text-[96px]">
              {hero.titleLines.join(" ")} <span className="text-brand-orange">{hero.titleHighlight}</span>
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs tracking-[0.18em] uppercase">
              Section H2 · Poppins 700 · 28 → 44px · lh 1.1
            </p>
            <p className="font-display text-[28px] leading-[1.1] font-bold text-brand-ink md:text-[44px]">
              {fleetIntro.heading.lead}{" "}
              <span className="text-brand-orange">{fleetIntro.heading.highlight}</span>
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs tracking-[0.18em] uppercase">Card / item H3 · Poppins 600 · 18–20px</p>
            <p className="font-display text-lg font-semibold text-brand-ink md:text-xl">
              Semi-Trailer Trucks
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs tracking-[0.18em] uppercase">Body · Inter 400 · 16 → 17px · lh 1.6</p>
            <p className="max-w-2xl">{hero.lead}</p>
          </div>
          <div>
            <p className="mb-2 text-xs tracking-[0.18em] uppercase">Script · Caveat 600 · 30–34px</p>
            <p className="font-script text-[32px] text-brand-ink">{trust.script}</p>
          </div>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button arrow>Get a Quote</Button>
          <Button variant="outline" arrow>
            Our Story
          </Button>
          <Button variant="primary" icon={<Phone aria-hidden="true" />} href="tel:+919938874147">
            Call us
          </Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card bg-brand-ink p-8">
          <Button arrow>Get a Quote</Button>
          <Button variant="ghost" icon={<Truck aria-hidden="true" />} href="/fleet">
            Our Fleet
          </Button>
        </div>
      </Block>

      <Block title="Eyebrow">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6">
            <Eyebrow>Our Fleet</Eyebrow>
          </div>
          <div className="rounded-card bg-brand-ink p-6">
            <Eyebrow tone="dark">Our Network</Eyebrow>
          </div>
          <div className="rounded-card bg-brand-ink p-6">
            <Eyebrow tone="dark" barAfter>
              {hero.eyebrow}
            </Eyebrow>
            <p className="text-xs text-white/70">Hero variant: bar after text</p>
          </div>
        </div>
      </Block>
    </div>
  );
}
