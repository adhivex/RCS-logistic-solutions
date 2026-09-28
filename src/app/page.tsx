import Link from "next/link";

// Phase 1 placeholder — the homepage is built in Phase 3 (docs/07-build-plan.md).
export default function Home() {
  return (
    <section className="section-y">
      <div className="container-site">
        <h1 className="text-4xl font-bold">RCS Logistic — redesign in progress</h1>
        <p className="mt-4">
          See the{" "}
          <Link href="/styleguide" className="font-semibold text-action underline underline-offset-4">
            styleguide
          </Link>{" "}
          for the Phase 1 design tokens.
        </p>
      </div>
    </section>
  );
}
