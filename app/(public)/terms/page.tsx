import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of the Chiben Properties website and the information published on it.',
}

const LAST_UPDATED = '18 May 2026'

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title={
        <>
          Terms of <em>service.</em>
        </>
      }
      intro="These terms govern your use of this website. By using the site you agree to them. If you don’t, please stop using the site."
      lastUpdated={LAST_UPDATED}
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by <strong>Chiben Properties Ltd</strong>, a
        private limited company registered in England &amp; Wales (company
        number: <strong>16819031</strong>), registered office at Bartle
        House, Oxford Court, Manchester, M2 3WQ. Contact:{' '}
        <a href="mailto:info@chibenproperties.com">info@chibenproperties.com</a>.
      </p>

      <h2>2. Acceptance of terms</h2>
      <p>
        By accessing or using this website, you agree to be bound by these
        Terms of Service and our{' '}
        <a href="/privacy">Privacy Policy</a> and{' '}
        <a href="/cookies">Cookie Policy</a>. If you are using the site on
        behalf of an organisation, you confirm that you have authority to bind
        that organisation to these terms.
      </p>

      <div className="callout">
        <p>
          <strong>Important — not financial advice or a financial promotion.</strong>{' '}
          The information on this website is for general information only. It is
          not investment, financial, tax or legal advice, and it is not an
          offer or solicitation to invest. Any investment opportunities discussed
          here are made available only to investors who qualify under the
          relevant UK exemptions and who receive offer documents directly from
          us. If you are in any doubt about whether an investment is suitable
          for you, you should seek independent advice from a financial adviser
          authorised by the Financial Conduct Authority (FCA).
        </p>
      </div>

      <h2>3. Risk warning</h2>
      <p>
        Property investments involve risk. <strong>Your capital is at risk.</strong>{' '}
        The value of property can go down as well as up, and you may not get
        back the amount you originally invested. Returns are not guaranteed.
        Past performance is not a reliable indicator of future results. Property
        investments are typically illiquid — you should not invest money you
        may need to access at short notice. Tax treatment depends on individual
        circumstances and may change in the future.
      </p>

      <h2>4. Use of the website</h2>
      <p>You agree that you will:</p>
      <ul>
        <li>Use the website only for lawful purposes.</li>
        <li>Not use it in any way that breaches any applicable local, national or international law or regulation.</li>
        <li>Not knowingly transmit any data, send or upload any material that contains viruses or any other harmful programs.</li>
        <li>Not attempt to gain unauthorised access to the website, the server on which it is stored, or any related infrastructure.</li>
        <li>Not use the website to copy, store, host, transmit or distribute any material that is unlawful, harmful or infringes third-party rights.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        All content on this website — including text, images, logos, layouts
        and code — is owned by Chiben Properties Ltd or licensed to us, and is
        protected by UK and international intellectual property laws. You may
        view, download and print pages for personal, non-commercial use,
        provided you keep all copyright and proprietary notices intact. You
        may not reproduce, republish or commercially exploit any of it without
        our written permission.
      </p>

      <h2>6. Investor and JV information</h2>
      <p>
        Detailed deal information, projected returns, underwriting models and
        legal documentation are shared on request with prospective investors
        and JV partners. Anything shared in that context is{' '}
        <strong>confidential</strong> and is shared on the understanding that:
      </p>
      <ul>
        <li>It is for your own evaluation only and must not be shared with third parties without our consent.</li>
        <li>Projections and forecasts are based on assumptions that may not be realised.</li>
        <li>You are responsible for taking your own independent legal, tax and financial advice before making any investment decision.</li>
        <li>No binding offer is made until terms are documented in a signed agreement.</li>
      </ul>

      <h2>7. Third-party links</h2>
      <p>
        The website may contain links to third-party websites. We don&apos;t
        control those sites and aren&apos;t responsible for their content or
        privacy practices. Following links is at your own risk.
      </p>

      <h2>8. Disclaimer of warranties</h2>
      <p>
        The website is provided on an &quot;as is&quot; and &quot;as
        available&quot; basis. While we take reasonable care to keep the
        information up to date and accurate, we make no warranties or
        representations — express or implied — about the completeness,
        accuracy, reliability or availability of the website or any of the
        information on it.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Chiben Properties Ltd, its
        directors, employees and agents shall not be liable for any indirect,
        incidental, special, consequential or punitive damages, or any loss of
        profits, revenue, data or use, arising out of or in connection with
        your use of this website. Nothing in these terms excludes or limits
        our liability for death or personal injury caused by our negligence,
        for fraud, or for any other liability that cannot be excluded under
        UK law.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may revise these terms from time to time. The version in force is
        the one published on this page on the date of your visit. By continuing
        to use the website after changes are posted, you accept the revised
        terms.
      </p>

      <h2>11. Governing law and jurisdiction</h2>
      <p>
        These terms and any dispute or claim arising out of or in connection
        with them or their subject matter or formation (including
        non-contractual disputes or claims) shall be governed by and construed
        in accordance with the law of <strong>England and Wales</strong>. The
        courts of England and Wales shall have exclusive jurisdiction to
        settle any such dispute or claim.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms?{' '}
        <a href="mailto:info@chibenproperties.com">info@chibenproperties.com</a>{' '}
        or write to us at the registered office address above.
      </p>
    </LegalPage>
  )
}
