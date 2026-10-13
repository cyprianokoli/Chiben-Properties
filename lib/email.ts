import nodemailer from 'nodemailer'
import { EMAIL } from '@/lib/constants'

// Enquiry notifications go out through the company's Google Workspace mailbox
// (MX: smtp.google.com). Needs SMTP_USER + SMTP_PASS (a Google app password).
// Without them, enquiries are still saved to the admin inbox and the email
// step is skipped.

interface EnquiryEmail {
  subject: string
  replyTo: string
  rows: { label: string; value: string | null | undefined }[]
  message?: string | null
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function isEmailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
}

export async function sendEnquiryEmail({ subject, replyTo, rows, message }: EnquiryEmail): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn('Enquiry email skipped: SMTP_USER / SMTP_PASS not set')
    return false
  }

  const port = Number(process.env.SMTP_PORT ?? 465)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  const filled = rows.filter((r) => r.value)
  const footer = 'Sent from the chibenproperties.com enquiry form. Reply to this email to answer the enquirer.'
  const text = [
    ...filled.map((r) => `${r.label}: ${r.value}`),
    ...(message ? ['', 'Message:', message] : []),
    '',
    footer,
  ].join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#0E1116">
      <table cellpadding="6" style="border-collapse:collapse">
        ${filled
          .map(
            (r) =>
              `<tr><td style="color:#6E7483;vertical-align:top">${escapeHtml(r.label)}</td><td><strong>${escapeHtml(
                String(r.value)
              )}</strong></td></tr>`
          )
          .join('')}
      </table>
      ${message ? `<p style="margin-top:16px;white-space:pre-wrap">${escapeHtml(message)}</p>` : ''}
      <p style="margin-top:24px;color:#6E7483;font-size:12px">${footer}</p>
    </div>`

  try {
    await transporter.sendMail({
      from: `"Chiben Website" <${process.env.SMTP_USER}>`,
      to: process.env.ENQUIRY_TO_EMAIL ?? EMAIL,
      replyTo,
      subject,
      text,
      html,
    })
    return true
  } catch (err) {
    console.error('Enquiry email failed:', err instanceof Error ? err.message : err)
    return false
  }
}
