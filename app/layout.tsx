import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Lince Performance | Sistemas de Receita, Não Campanhas",
  description: "A Lince Performance constrói sistemas de receita previsível para empresas que precisam escalar com consistência.",
  openGraph: {
    title: "Lince Performance | Sistemas de Receita, Não Campanhas",
    description: "A Lince Performance constrói sistemas de receita previsível para empresas que precisam escalar com consistência.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-inter antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
