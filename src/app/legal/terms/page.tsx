import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { conceptDisclaimer } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Terms of Use",
  description:
    "Terms governing use of the BUCKBOTICS website, concept-stage content, intellectual property, acceptable use and disclaimers.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Use"
      path="/legal/terms"
      intro="The rules for using this website, and the honest limits of what it publishes. Drafted for owner and counsel review before publication."
    >
      <LegalSection id="acceptance" h="1. Acceptance">
        <p>
          By using {`www.buckbotics.com`} you agree to these terms. If you do not agree, please do
          not use the site. We may update these terms; continued use after publication of a new
          version constitutes acceptance of it.
        </p>
      </LegalSection>

      <LegalSection id="nature" h="2. Nature of the content">
        <p>
          <strong className="font-semibold text-midnight">{conceptDisclaimer}</strong>
        </p>
        <p>
          Nothing on this site is an offer, quotation, warranty or commitment to sell or lease any
          equipment. Pricing, availability and delivery exist only in a written statement of work
          signed by both parties.
        </p>
      </LegalSection>

      <LegalSection id="status" h="3. Status labels and specifications">
        <p>
          Lifecycle labels (CONCEPT, IN DEVELOPMENT, PROTOTYPE, PILOT, AVAILABLE) have the meanings
          set out on the <a className="link-quiet" href="/product-status">Product Status</a> page.
          Specifications marked “Not specified / under engineering evaluation” are intentionally
          unpublished and must not be inferred, estimated or republished as figures.
        </p>
      </LegalSection>

      <LegalSection id="ip" h="4. Intellectual property">
        <p>
          The BUCKBOTICS wordmark, the BUCKi and BUCKi PERSONA names, site copy, layout and original
          concept artwork are owned by or licensed to BUCKBOTICS / the Buckingham venture. You may
          view and print pages for internal, non-commercial reference. You may not reproduce,
          modify, scrape, frame or commercially exploit site content without written permission,
          and you may not use our marks in a way that implies endorsement.
        </p>
      </LegalSection>

      <LegalSection id="use" h="5. Acceptable use">
        <ul className="list-disc pl-5">
          <li>No unlawful, fraudulent or misleading use of the site or its forms.</li>
          <li>No automated submission floods, scraping or circumvention of spam protections.</li>
          <li>No attempt to interfere with site operation or security.</li>
          <li>No representation that you are affiliated with BUCKBOTICS without written agreement.</li>
        </ul>
      </LegalSection>

      <LegalSection id="third-party" h="6. Third-party links">
        <p>
          Links to external sites, where present, are provided for convenience. We do not control
          their content, availability or privacy practices and are not responsible for them.
        </p>
      </LegalSection>

      <LegalSection id="disclaimer" h="7. Disclaimers and limitation of liability">
        <p>
          The site is provided “as is” and “as available”. To the maximum extent permitted by
          Canadian law, we disclaim warranties arising from the site, including accuracy of
          concept information, uninterrupted availability and fitness for a particular purpose. We
          are not liable for indirect, incidental or consequential damages arising from use of the
          site. Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </LegalSection>

      <LegalSection id="safety" h="8. Safety notice">
        <p>
          Robotic concepts described here are not certified, installed or operational equipment.
          Any future trial or deployment requires application-specific hazard assessment and
          qualified supervision. Do not attempt to replicate hardware, controls or tests depicted
          in concept material.
        </p>
      </LegalSection>

      <LegalSection id="law" h="9. Governing law">
        <p>
          These terms are governed by the laws of Ontario and the laws of Canada applicable
          therein, without regard to conflict-of-law principles. The correct legal entity name will
          replace “A Buckingham Venture” once formally confirmed by the owner.
        </p>
      </LegalSection>

      <LegalSection id="contact" h="10. Contact">
        <p>
          Questions about these terms: BUCKBOTICS, 26-2359 Royal Windsor Drive, Mississauga, Ontario
          L5J 4S9, Canada, info@buckbotics.com, 1 888 272 7884.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
