import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Levantamento de Requisitos",
  description: "Discovery estratégico da Freedom",
  generator: "Freedom Requisitos",

  icons: {
    icon: [
      // favicon padrão
      { url: "/favicon.ico" },

      // light / dark mode
      {
        url: "/icon-light-32x32.png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },

      // svg (fallback moderno)
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],

    apple: [{ url: "/apple-touch-icon.png" }, { url: "/apple-icon.png" }],

    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
