import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TEAmamos | Sistema em construção para apoiar famílias e pessoas TEA",
  description:
    "Conheça o TEAmamos, projeto idealizado por Vanderson Oliveira para criar um sistema de organização, previsibilidade e cuidado para pessoas TEA, famílias, cuidadores e profissionais. Colabore com ideias e ajude a construir essa solução.",
  keywords: [
    "TEAmamos",
    "aplicativo para TEA",
    "aplicativo para autismo",
    "rotina visual TEA",
    "sistema para famílias TEA",
    "organização para pessoas autistas",
    "apoio para pais de autistas",
    "cuidado e previsibilidade no TEA",
    "tecnologia para autismo",
  ],
  openGraph: {
    title: "TEAmamos | Organizar o cuidado sem perder o amor no processo",
    description:
      "Ajude a construir um sistema para organizar o cuidado de quem vive o TEA de perto.",
    type: "website",
    locale: "pt_BR",
    siteName: "TEAmamos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
