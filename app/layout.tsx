import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { ThemeProvider } from "@/components/provider/theme-provider";
import ClientSessionProvider from "@/components/provider/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sketch Flow - Create Beautiful Diagrams and Sketches",
  description:
    "A modern note-taking application with integrated drawing capabilities using Excalidraw. Create, manage, and collaborate on visual notes with a beautiful, intuitive interface.",
  keywords: [
    "drawing",
    "sketching",
    "diagrams",
    "notes",
    "excalidraw",
    "collaboration",
    "visual notes",
  ],
  authors: [{ name: "Sketch Flow Team" }],
  creator: "Sketch Flow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Sketch Flow - Create Beautiful Diagrams and Sketches",
    description:
      "A modern note-taking application with integrated drawing capabilities using Excalidraw.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sketch Flow - Create Beautiful Diagrams and Sketches",
    description:
      "A modern note-taking application with integrated drawing capabilities using Excalidraw.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-2`}
      >
        <ClientSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
