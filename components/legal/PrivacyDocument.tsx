import type { LegalHrefs, LegalLayout } from './types'

const LAST_UPDATED = '18 May 2026'

// Shared by the live /privacy page and the redesigned preview page, so the
// legal text only lives in one place.
export default function PrivacyDocument({ Layout, hrefs }: { Layout: LegalLayout; hrefs: LegalHrefs }) {
  return (
    <Layout
      eyebrow="Privacy Policy"
      title={
        <>
          How we handle <em>your data.</em>
        </>
      }
      intro="Chiben Properties Ltd takes privacy seriously. This policy explains what personal information we collect, how we use it, and the rights you have under UK GDPR."
      lastUpdated={LAST_UPDATED}
    >
      <h2>1. Who we are</h2>
      <p>
        Chiben Properties Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
        is a private limited company registered in England &amp; Wales
        (company number: <strong>16819031</strong>), with its registered
        office at Bartle House, Oxford Court, Manchester, M2 3WQ.
      </p>
      <p>
        We are the <strong>data controller</strong> for the personal data
        described in this policy. If you have any questions about it, contact us at{' '}
        <a href="mailto:info@chibenproperties.com">info@chibenproperties.com</a>{' '}
        or by post at the address above.
      </p>

      <h2>2. What information we collect</h2>
      <p>We only collect the personal data we need in order to respond to you and run the business. That generally falls into three buckets:</p>

      <h3>(a) Information you give us directly</h3>
      <ul>
        <li>Your name, email address, phone number and message when you submit our contact form or book a call.</li>
        <li>The nature of your enquiry (investment, JV opportunity, off-market deal, general).</li>
        <li>Any further information you choose to share by email, on a call, or as part of an investor onboarding process.</li>
      </ul>

      <h3>(b) Information we collect automatically</h3>
      <ul>
        <li>Technical information about your visit — IP address (anonymised where possible), browser type, device type, the pages you view and the time of your visit.</li>
        <li>This is used in aggregate to understand how the site is performing and to keep it secure.</li>
      </ul>

      <h3>(c) Information from third parties</h3>
      <ul>
        <li>If you become an investor or JV partner, we may receive identity, address and source-of-funds documentation from you or from third-party verification services as part of our anti-money-laundering checks.</li>
      </ul>

      <h2>3. Why we use it (lawful basis)</h2>
      <p>Under UK GDPR we are required to have a lawful basis for processing your personal data. Ours are:</p>
      <ul>
        <li><strong>Legitimate interests</strong> — to respond to enquiries, run our investor relationships, and keep our website and systems secure.</li>
        <li><strong>Contract</strong> — to perform a contract with you (for example, a joint-venture or fixed-return loan agreement) or to take steps at your request before entering into one.</li>
        <li><strong>Legal obligation</strong> — to comply with UK anti-money-laundering, tax, accounting and other statutory obligations.</li>
        <li><strong>Consent</strong> — where we ask for it (for example, to send you marketing updates). You can withdraw consent at any time.</li>
      </ul>

      <h2>4. Who we share it with</h2>
      <p>We do not sell your personal data. We share it only with parties who have a clear reason to receive it:</p>
      <ul>
        <li>Our hosting and database provider (Supabase) and other infrastructure suppliers that store and process the data on our behalf.</li>
        <li>Professional advisers — solicitors, accountants, tax advisers — under standard confidentiality obligations.</li>
        <li>Regulators, law enforcement, courts or other authorities where we are required by law to disclose information.</li>
        <li>If we ever sell or restructure the business, the buyer or successor as part of that transaction.</li>
      </ul>

      <h2>5. International transfers</h2>
      <p>
        Some of our service providers process data outside the UK. Where that
        happens, we rely on the UK government&apos;s adequacy decisions or on
        standard contractual clauses (with the UK addendum) to ensure your data
        receives an equivalent level of protection.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li>General enquiries: retained for up to 24 months unless you ask us to delete them sooner.</li>
        <li>Investor / JV records: retained for the lifetime of the relationship and for at least 6 years afterwards, in line with HMRC and money-laundering record-keeping requirements.</li>
        <li>Website logs and security data: retained for up to 12 months.</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>Under UK GDPR you have the right to:</p>
      <ul>
        <li>Ask for a copy of the personal data we hold about you.</li>
        <li>Have inaccurate data corrected.</li>
        <li>Ask us to delete data we no longer need to keep (subject to legal retention rules).</li>
        <li>Restrict or object to how we process your data.</li>
        <li>Receive your data in a portable format and have it sent to another controller, where applicable.</li>
        <li>Withdraw consent at any time, where we&apos;re relying on consent.</li>
      </ul>
      <p>
        To exercise any of these rights, email{' '}
        <a href="mailto:info@chibenproperties.com">info@chibenproperties.com</a>.
        We&apos;ll respond within one month.
      </p>

      <div className="callout">
        <p>
          <strong>Complaints.</strong> If you&apos;re not happy with how we&apos;ve
          handled your data, you can complain to the UK Information
          Commissioner&apos;s Office (ICO):{' '}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>{' '}
          · 0303 123 1113.
        </p>
      </div>

      <h2>8. Cookies</h2>
      <p>
        Our website uses a small number of cookies. See our{' '}
        <a href={hrefs.cookies}>Cookie Policy</a> for the full list and how to
        control them.
      </p>

      <h2>9. Security</h2>
      <p>
        We use industry-standard technical and organisational measures —
        encrypted connections, role-based access, regular backups and supplier
        due diligence — to protect your personal data. No system is perfectly
        secure, but we work hard to keep yours safe.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot;
        date at the top will always show when the latest version was published.
        If we make material changes we&apos;ll let known investors know directly.
      </p>

      <h2>Contact</h2>
      <p>
        Chiben Properties Ltd<br />
        Bartle House, Oxford Court<br />
        Manchester, M2 3WQ<br />
        <a href="mailto:info@chibenproperties.com">info@chibenproperties.com</a>{' '}
        · 0330 043 7697
      </p>
    </Layout>
  )
}
