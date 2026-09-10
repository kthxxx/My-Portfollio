import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Keith Justin — Developer, Designer & Creative", template: "%s — Keith Justin" },
  description: "Keith Justin Emeterio is a Computer Science student in the Philippines building at the intersection of code, design, and media.",
  applicationName: "KEITH.OS",
  keywords: ["Keith Justin Emeterio", "developer", "designer", "Computer Science", "Philippines", "portfolio"],
  authors: [{ name: "Keith Justin Emeterio" }],
  openGraph: { title: "Keith Justin — Developer, Designer & Creative", description: "Code × Design × Media. Enter KEITH.OS.", type: "website", locale: "en_PH", siteName: "KEITH.OS" },
  twitter: { card: "summary_large_image", title: "Keith Justin — Developer, Designer & Creative", description: "Code × Design × Media. Enter KEITH.OS." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b0b0a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body>{children}<script dangerouslySetInnerHTML={{ __html: `console.log('%c KEITH.OS %c Curious enough to open DevTools? Nice. Portfolio by Keith Justin.', 'background:#d9ff43;color:#0b0b0a;padding:4px 8px;font-weight:bold', 'color:#d9ff43')` }} /></body></html>;
}
