import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { ButtonLink } from "@/components/ui/Primitives";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Accessibility Statement",
  description:
    "BUCKBOTICS accessibility commitment — design target WCAG 2.2 AA, keyboard navigation, visible focus, text alternatives and known limitations.",
  path: "/legal/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalShell
      title="Accessibility Statement"
      path="/legal/accessibility"
      intro="Our design target, what is already in place, known limitations and how to tell us when something gets in your way."
    >
      <LegalSection id="commitment" h="1. Our commitment">
        <p>
          This website is designed toward <strong className="font-semibold text-midnight">WCAG 2.2
          Level AA</strong>. Accessibility is part of the design system — not a retro-fit — and
          issues found during testing are tracked to closure before launch.
        </p>
      </LegalSection>

      <LegalSection id="measures" h="2. What that means in practice">
        <ul className="list-disc pl-5">
          <li>Semantic HTML structure with landmarks, headings and a skip-to-content link.</li>
          <li>Full keyboard navigation with visible focus indicators on every interactive element.</li>
          <li>Navigation menus and galleries expose their state to screen readers (aria-expanded, tabs, lists).</li>
          <li>Colour contrast targets AA for text and UI components; colour is never the only signal.</li>
          <li>Descriptive alternative text for imagery, including concept-visualization disclosures.</li>
          <li>Responsive layouts down to 320px width with no clipped content and generous tap targets.</li>
          <li>
            <code className="font-mono text-sm">prefers-reduced-motion</code> respected — non-essential
            animation and smooth scrolling are disabled when requested.
          </li>
          <li>Forms use labelled inputs, inline error messages tied to fields and clear success states.</li>
          <li>Plain-language copy with acronyms and status terms defined on dedicated pages.</li>
        </ul>
      </LegalSection>

      <LegalSection id="limitations" h="3. Known limitations">
        <ul className="list-disc pl-5">
          <li>
            Product imagery is currently presented as labelled concept placeholders; final artwork
            must meet the same contrast and text-alternative rules when delivered.
          </li>
          <li>
            Some long data tables rely on horizontal scrolling on very narrow screens; tables remain
            keyboard-scrollable with headers preserved.
          </li>
          <li>
            Third-party services (if added later, such as CRM-hosted documents) inherit this
            statement only after their own review.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="feedback" h="4. Feedback and contact">
        <p>
          Found a barrier? Tell us what page, what you were trying to do and what happened — we
          treat accessibility reports as defects and aim to respond promptly.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink href="/contact?type=support">Report an accessibility issue</ButtonLink>
          <ButtonLink href="mailto:info@buckbotics.com" tone="secondary">
            Email info@buckbotics.com
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-muted">
          If you need content in an alternative format, ask — we can provide page content in
          larger text or plain HTML on request while French-language pages remain in preparation.
        </p>
      </LegalSection>

      <LegalSection id="method" h="5. How we test">
        <p>
          Key templates are reviewed with automated checks (linting, contrast and structure), manual
          keyboard-only walkthroughs and screen-reader spot checks on desktop and mobile. Results
          are recorded with the QA package for each release.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
