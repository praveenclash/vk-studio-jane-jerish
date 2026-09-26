import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#faf7f2",
};

export const metadata: Metadata = {
  title: "Jane & Jerish — Forever Begins | Wedding Celebration",
  description:
    "Join us to celebrate the wedding of Jane and Jerish. Save the date, view event details, RSVP, and share your blessings & wishes.",
  keywords: ["wedding", "Jane and Jerish", "wedding invitation", "RSVP", "wedding website"],
  authors: [{ name: "VK Studio" }],
  openGraph: {
    title: "Jane & Jerish — Wedding Celebration",
    description: "Two lives, one love. Join us as we celebrate our holy matrimony and reception.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#c5a059]/20 selection:text-[#a27e36]">
        {children}
      </body>
    </html>
  );
}
