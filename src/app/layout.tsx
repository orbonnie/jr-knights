import type { Metadata } from "next";
import { Bebas_Neue, Inter, Arimo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
});

export const metadata: Metadata = {
  title: "Centennial Knights Football",
  description: "Home of the Centennial Knights — GHSA Class 4A, Roswell, GA",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${bebasNeue.variable} ${inter.variable} ${arimo.variable} bg-white text-white font-body antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
