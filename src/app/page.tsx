import Link from "next/link";
import { CtaBand } from "@/components/ui/cta-band";

// Phase 2 placeholder — the homepage is built in Phase 3 (docs/07-build-plan.md).
export default function Home() {
  return (
    <>
      <section className="section-y">
        <div className="container-site">
          <h1 className="text-4xl font-bold">RCS Logistic — redesign in progress</h1>
          <p className="mt-4">
            Layout shell (Phase 2). Components are shown on the{" "}
            <Link href="/styleguide" className="font-semibold text-action underline underline-offset-4">
              styleguide
            </Link>
            .
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
