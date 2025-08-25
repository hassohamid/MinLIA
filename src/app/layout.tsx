import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/layout/nav";
import Footer from "@/layout/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MinLIA | Organisera dina LIA-ansökningar",
  description:
    "Anteckna alla företag du söker LIA till. Håll koll på vilka som svarat, analysera din process och markera dina toppval. Utvecklad av studenter för studenter.",

  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  // Open Graph för delning (WhatsApp, Facebook, etc.)
  openGraph: {
    title: "MinLIA | Organisera dina LIA-ansökningar",
    description:
      "Anteckna alla företag du söker LIA till. Håll koll på vilka som svarat, analysera din process och markera dina toppval. Utvecklad av studenter för studenter.",
    url: "https://minlia.vercel.app",
    siteName: "MinLIA",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "MinLIA | Organisera dina LIA-ansökningar",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "MinLIA | Organisera dina LIA-ansökningar",
    description:
      "Anteckna alla företag du söker LIA till. Håll koll på vilka som svarat, analysera din process och markera dina toppval.",
    images: ["/favicon.svg"],
  },

  // PWA metadata
  manifest: "/manifest.json",

  // Viewport och andra mobil-optimeringar
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <Nav />
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
            theme="system"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
