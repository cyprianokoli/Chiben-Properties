import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chibenproperties.com"),
  title: {
    default: "Chiben Properties | UK Property Deal Sourcing for Investors",
    template: "%s | Chiben Properties",
  },
  description:
    "We find, vet and secure buy-to-let, HMO and refurb deals for UK and overseas investors across Northern England and the Midlands.",
  openGraph: {
    siteName: "Chiben Properties",
    images: ["/images/og/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
