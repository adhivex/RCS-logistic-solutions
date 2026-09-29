import type { Metadata } from "next";
import { AccentHeading } from "@/components/ui/accent-heading";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { SectionHead, TextLink } from "@/components/ui/section-head";
import { Todo } from "@/components/ui/todo";
import { ctaSection, fleetIntro, footerCopy, hero, servicesIntro } from "@/content";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/** Tokens from src/app/globals.css (docs/02-design-system.md), with measured contrast. */
const colours = [
  {
    name: "orange",
    hex: "#EA5A24",
    swatch: "bg-orange",
    note: "Accent words ≥ 32px, icons, glows · 3.51:1 on white",
  },
  {
    name: "orange-deep",
    hex: "#C74916",
    swatch: "bg-orange-deep",
    note: "Buttons, small orange text · 4.78:1 with white",
  },
  { name: "orange-dark", hex: "#AB3D10", swatch: "bg-orange-dark", note: "Button hover · 6.16:1 with white" },
  {
    name: "orange-light",
    hex: "#F2763F",
    swatch: "bg-orange-light",
    note: "Orange text on navy · 5.28:1 on ink",
  },
  { name: "orange-soft", hex: "#FDEEE6", swatch: "bg-orange-soft", note: "Icon tiles" },
  { name: "ink", hex: "#19283B", swatch: "bg-ink", note: "Headings, numbers strip, dark buttons, hero base" },
  { name: "ink-2", hex: "#172333", swatch: "bg-ink-2", note: "Deepest panels" },
  { name: "steel", hex: "#243F5C", swatch: "bg-steel", note: "End of navy gradients" },
  { name: "footer", hex: "#111D2C", swatch: "bg-footer", note: "Footer" },
  { name: "slate", hex: "#4F5B6B", swatch: "bg-slate", note: "Body text · 6.91:1 on white" },
  {
    name: "muted",
    hex: "#667180",
    swatch: "bg-muted",
    note: "Labels, captions · 4.95:1 on white, 4.54:1 on paper",
  },
  { name: "paper", hex: "#F3F5F8", swatch: "bg-paper", note: "Light section background, scrolled header" },
  { name: "line", hex: "#DFE4EB", swatch: "bg-line", note: "Borders and dividers" },
  {
    name: "field",
    hex: "#8A94A3",
    swatch: "bg-field",
    note: "Input underlines, off switch · 3.07:1 on white",
  },
];

const type = [
  {
    role: "Hero H1",
    sample: "Moving Business",
    className:
      "font-display text-[clamp(46px,7.6vw,118px)] leading-[.92] font-bold tracking-[-0.05em] text-ink",
    spec: "Manrope 700 · 46 → 118px · lh .92",
  },
  {
    role: "Section H2",
    sample: "Logistics built around",
    className:
      "font-display text-[clamp(32px,4.2vw,56px)] leading-[1.02] font-bold tracking-[-0.035em] text-ink",
    spec: "Manrope 700 · 32 → 56px",
  },
  {
    role: "Card H3",
    sample: "Semi-Trailer Trucks",
    className: "font-display text-2xl font-bold tracking-[-0.03em] text-ink",
    spec: "Manrope 600–700 · 17–24px",
  },
  {
    role: "Accent",
    sample: "your supply chain.",
    className: "font-serif text-[clamp(32px,4.2vw,56px)] leading-none text-orange italic",
    spec: "Instrument Serif italic · ~1.05×",
  },
  {
    role: "Body",
    sample: hero.lead,
    className: "max-w-xl text-[17px] text-slate",
    spec: "Inter 400 · 15.5 → 17px · lh 1.65",
  },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14">
      <h2 className="mb-8 text-2xl">{title}</h2>
      {children}
    </section>
  );
}

/** Internal reference page (noindex): tokens, type and components. */
export default function StyleguidePage() {
  return (
    <div className="bg-white pt-28 pb-20">
      <div className="container-site">
        <Label>Internal</Label>
        <h1 className="mt-4 text-[clamp(40px,5vw,64px)]">Styleguide</h1>
        <p className="mt-3 max-w-2xl">
          Tokens and components from <code>docs/02-design-system.md</code>. Source of truth:{" "}
          <code>docs/reference/homepage-preview.html</code>.
        </p>

        <Block title="Colours">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colours.map((colour) => (
              <li key={colour.name} className="flex gap-4 rounded-2xl border border-line p-4">
                <span className={`size-14 shrink-0 rounded-xl border border-line ${colour.swatch}`} />
                <span>
                  <span className="block font-semibold text-ink">
                    {colour.name} <span className="font-normal text-muted">{colour.hex}</span>
                  </span>
                  <span className="text-sm">{colour.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Type">
          <ul className="grid gap-8">
            {type.map((item) => (
              <li key={item.role} className="grid gap-2 md:grid-cols-[180px_1fr] md:gap-8">
                <span className="text-sm text-muted">
                  <b className="block text-ink">{item.role}</b>
                  {item.spec}
                </span>
                <span className={item.className}>{item.sample}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Headings with accent">
          <SectionHead
            label={servicesIntro.label}
            heading={servicesIntro.heading}
            link={servicesIntro.link}
          />
          <SectionHead label={fleetIntro.label} heading={fleetIntro.heading} />
          <div className="rounded-2xl bg-ink p-10">
            <Label tone="dark" centered>
              {ctaSection.label}
            </Label>
            <AccentHeading
              heading={ctaSection.heading}
              tone="dark"
              className="mt-6 text-center text-[clamp(36px,5vw,72px)] tracking-[-0.05em]"
            />
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Get a Quote</Button>
            <Button variant="dark">Close</Button>
            <Button size="sm">Get a Quote</Button>
            <TextLink href="/services">All services</TextLink>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-ink p-8">
            <Button>Get a Quote</Button>
            <Button variant="light" href="/fleet">
              Explore the Fleet
            </Button>
            <Button variant="light" href="tel:+919938874147" icon={<PhoneIcon />}>
              Call the Team
            </Button>
          </div>
        </Block>

        <Block title="Labels, taglines and placeholders">
          <div className="grid gap-6">
            <Label>What We Do</Label>
            <p className="font-serif text-2xl text-ink italic">{footerCopy.tagline}</p>
            <p>
              Unconfirmed content in development: <Todo value="TODO(client): cities served" />
            </p>
          </div>
        </Block>
      </div>
    </div>
  );
}
