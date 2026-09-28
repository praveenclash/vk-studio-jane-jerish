import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0907",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Jane Jaculin & Jerish Jeyasekaran — Forever Begins | Wedding Celebration",
  description:
    "Join us to celebrate the wedding of Jane Jaculin Silviya and Jerish Jeyasekaran in Kanyakumari. Save the date for October 12, 2026, view event details, RSVP, and share your blessings & wishes.",
  keywords: ["wedding", "Jane and Jerish", "Jerish Jeyasekaran", "Jane Jaculin Silviya", "Kanyakumari wedding", "wedding invitation", "RSVP"],
  authors: [{ name: "VK Studio" }],
  openGraph: {
    title: "Jane & Jerish — Wedding Celebration | October 12, 2026",
    description: "Two lives, one love. Join us as we celebrate our holy matrimony and wedding reception in Kanyakumari.",
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
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#0b0907] text-[#fcfbf7] selection:bg-[#d4af37]/30 selection:text-[#f6e29f]">
        {children}
      </body>
    </html>
  );
}
