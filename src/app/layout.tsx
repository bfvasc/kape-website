import type { Metadata } from "next";
import { Outfit, Libre_Baskerville } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "Kapé",
  description: "Site institucional da plataforma Kapé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${libreBaskerville.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
