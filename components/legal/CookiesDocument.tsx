import type { LegalHrefs, LegalLayout } from './types'

const LAST_UPDATED = '18 May 2026'

// Legal text for the /cookies page. Layout is passed in so the wrapper can change
// without touching the policy wording.
// Takes hrefs like the other documents even though it has no internal links yet
export default function CookiesDocument({ Layout }: { Layout: LegalLayout; hrefs: LegalHrefs }) {
  return (
    <Layout
      eyebrow="Cookie Policy"
      title={
        <>
          Cookies, plainly <em>explained.</em>
        </>
      }
      intro="We keep cookie use to a minimum — only what’s needed to make the website and admin area work. This page explains exactly what we use and how to manage them."
      lastUpdated={LAST_UPDATED}
    >
      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files placed on your device when you visit a
        website. They&apos;re used to make sites work, to remember preferences,
        and sometimes to measure how the site is used. We also use similar
        technologies such as browser local storage to do the same things.
      </p>

      <h2>2. The cookies we use</h2>

      <h3>Strictly necessary</h3>
      <p>
        These cookies are essential for the website to function. They can&apos;t
        be turned off without breaking core features.
      </p>
      <ul>
        <li>
          <strong>Supabase auth cookies</strong> — set by our authentication
          provider when an administrator signs in to the admin area. Used to
          keep the session secure. Removed when you sign out or the session
          expires.
        </li>
        <li>
          <strong>Security and load-balancing cookies</strong> — set by our
          hosting provider to keep the site stable and secure.
        </li>
      </ul>

      <h3>Functional</h3>
      <p>
        These remember preferences or state that make the site easier to use.
        At present we don&apos;t set any optional functional cookies — but if
        we add features such as &quot;remember me&quot;, they&apos;ll be listed
        here.
      </p>

      <h3>Analytics</h3>
      <p>
        We don&apos;t currently run third-party analytics (e.g. Google
        Analytics, Plausible) on this site. If we add them in the future,
        we&apos;ll update this page and ask for your consent first via a cookie
        banner.
      </p>

      <h3>Marketing / advertising</h3>
      <p>
        We don&apos;t run any advertising or remarketing cookies. We don&apos;t
        share information about your visits with advertisers.
      </p>

      <h2>3. Your choices</h2>
      <p>
        Because we only set strictly necessary cookies, you don&apos;t need to
        give consent for them under UK PECR — but you can still control or
        block cookies through your browser.
      </p>

      <h3>Manage cookies in your browser</h3>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edge
          </a>
        </li>
      </ul>
      <p>
        Note that blocking strictly necessary cookies may stop parts of the
        site (particularly the admin area) from working correctly.
      </p>

      <div className="callout">
        <p>
          <strong>Do Not Track.</strong> Some browsers send a &quot;Do Not
          Track&quot; signal. Because there&apos;s no agreed standard for how
          sites should respond to it, this website does not currently react to
          DNT signals.
        </p>
      </div>

      <h2>4. Changes to this policy</h2>
      <p>
        When we add new tools or change which cookies we use, we&apos;ll update
        this page. The &quot;Last updated&quot; date at the top will always
        reflect the most recent version. If we add optional cookies (e.g.
        analytics), we&apos;ll also show a cookie banner asking for your
        consent before they&apos;re set.
      </p>

      <h2>5. More information</h2>
      <p>
        For background on how cookies work and your rights under UK PECR and
        UK GDPR, the Information Commissioner&apos;s Office has plain-English
        guidance:{' '}
        <a
          href="https://ico.org.uk/your-data-matters/online/cookies/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ico.org.uk
        </a>
        .
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies?{' '}
        <a href="mailto:info@chibenproperties.com">info@chibenproperties.com</a>.
      </p>
    </Layout>
  )
}
