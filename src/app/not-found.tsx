import { ButtonLink } from "@/components/ui/Primitives";
import { FAMILIES } from "@/data/families";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">404 — route not found</p>
          <h1 className="display-xl mt-3">This path does not exist.</h1>
          <p className="lede mt-5">
            The page may have moved as the site structure evolved. Try one of these canonical
            routes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Back to the homepage</ButtonLink>
            <ButtonLink href="/robots" tone="secondary">
              All robot families
            </ButtonLink>
            <ButtonLink href="/contact" tone="secondary">
              Contact
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <p className="spec-label text-center">Popular destinations</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {FAMILIES.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/robots/${f.slug}`}
                  className="btn-outline block px-4 py-1.5 text-sm"
                >
                  {f.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/industries"
                className="btn-outline block px-4 py-1.5 text-sm"
              >
                Industry directory
              </Link>
            </li>
            <li>
              <Link
                href="/technology/buckcore"
                className="btn-outline block px-4 py-1.5 text-sm"
              >
                BUCKCORE
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
