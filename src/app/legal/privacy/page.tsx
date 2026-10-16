import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How BUCKBOTICS collects, uses, stores and protects enquiry data, consent, retention, access and deletion rights under Canadian privacy law.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      path="/legal/privacy"
      intro="What we collect when you contact us, why we collect it, how long we keep it and the choices you have. Written for Canadian users, drafted for counsel review before publication."
    >
      <LegalSection id="who" h="1. Who we are">
        <p>
          BUCKBOTICS is a Buckingham venture at {site.addressLine}. References to “we”, “us” and
          “our” in this policy mean BUCKBOTICS for the operation of {site.domain}. Privacy questions
          can be sent to <a className="link-quiet" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalSection>

      <LegalSection id="collect" h="2. What we collect">
        <p>
          <strong className="font-semibold text-midnight">Enquiry forms.</strong> Contact name,
          organization, business email, country/province, requested industry, robot family/model or
          PERSONA collection, task description, operating environment, frequency/shift pattern,
          target schedule, optional budget band, enquiry type, consent choices and the form
          timestamp we store to prevent automated submissions.
        </p>
        <p>
          <strong className="font-semibold text-midnight">Technical records.</strong> Standard
          server logs (IP address, time, requested page) used for security, spam throttling and
          abuse prevention.
        </p>
        <p>
          <strong className="font-semibold text-midnight">What we do not collect here.</strong> We
          do not ask for faces, voice recordings, medical records, household details or memorial
          archives on general forms. Sensitive material for MEMORIA or rights review is handled
          later through a secured channel, never through this website.
        </p>
      </LegalSection>

      <LegalSection id="use" h="3. How we use it">
        <p>Purposes, and nothing beyond them:</p>
        <ul className="list-disc pl-5">
          <li>Responding to your enquiry and routing it to the right team member.</li>
          <li>Feasibility, pilot and partnership discussions you request.</li>
          <li>Keeping a consent-timestamped record of what you agreed to.</li>
          <li>Security, spam prevention and abuse detection.</li>
          <li>Optional project updates, only if you separately opt in (CASL).</li>
        </ul>
        <p>
          We do not sell personal information, and we do not use enquiry content to train public AI
          models.
        </p>
      </LegalSection>

      <LegalSection id="legal-basis" h="4. Consent and lawful basis">
        <p>
          Form submission requires an explicit, unticked consent checkbox covering storage and use
          for responding to your enquiry. Marketing consent is separate, optional and withdrawable
          using the unsubscribe method in each message or by contacting us. Consent timestamps are
          retained as evidence.
        </p>
      </LegalSection>

      <LegalSection id="storage" h="5. Storage and security">
        <p>
          Form data travels over encrypted transport (HTTPS) and is stored in a company-controlled
          lead store with restricted access. Where a CRM or inbox integration is configured by the
          owner, the same data is transmitted to that system under its own security controls. No
          third-party advertising trackers process form data.
        </p>
      </LegalSection>

      <LegalSection id="retention" h="6. Retention">
        <p>
          Enquiry records are kept while the conversation or a potential engagement remains active,
          and periodically reviewed afterwards. Superseded records are deleted or anonymized on
          schedule unless a legal obligation requires retention. You can request deletion at any
          time (see below).
        </p>
      </LegalSection>

      <LegalSection id="sharing" h="7. Sharing">
        <p>
          Data is shared only with: (a) team members handling your enquiry; (b) service providers
          configured by the owner (CRM, hosting, email) under contractual confidentiality; and (c)
          authorities where legally required. We do not publish enquiry content, and customer
          identities are never used publicly without written approval.
        </p>
      </LegalSection>

      <LegalSection id="cookies" h="8. Cookies">
        <p>
          See the <a className="link-quiet" href="/legal/cookies">Cookie Notice</a>. Essential
          cookies only run at launch; optional analytics require consent.
        </p>
      </LegalSection>

      <LegalSection id="rights" h="9. Your rights">
        <p>
          You may request access to, correction of, or deletion of your personal information, and
          may withdraw consent at any time. Write to {site.email} from the address you used so we
          can verify your identity. We respond within a reasonable period and explain any legal
          exception that applies.
        </p>
      </LegalSection>

      <LegalSection id="children" h="10. Children">
        <p>
          This site is directed to business and professional audiences. We do not knowingly collect
          personal information from children, and no part of our marketing targets minors.
        </p>
      </LegalSection>

      <LegalSection id="changes" h="11. Changes and contact">
        <p>
          Material changes will be published on this page with a revised version number and date.
          Contact: {site.fullName}, {site.addressLine}, {site.email}, {site.phoneDisplay}.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
