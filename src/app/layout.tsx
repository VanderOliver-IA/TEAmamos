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
  title: "TEAmamos | Rotina, cuidado e previsibilidade para pessoas neurodivergentes",
  description:
    "TEAmamos é uma plataforma em construção para apoiar pessoas neurodivergentes, famílias, cuidadores, escolas e profissionais com rotina, organização, autorregulação, medicamentos, terapias, escola e acompanhamento do cuidado.",
  keywords: [
    "TEAmamos",
    "neurodivergência",
    "TEA",
    "autismo",
    "TDAH",
    "rotina visual",
    "autorregulação",
    "previsibilidade",
    "inclusão",
    "cuidado familiar",
    "acompanhamento terapêutico",
    "organização escolar",
    "medicamentos",
    "crises e gatilhos",
    "rede de apoio",
  ],
  openGraph: {
    title: "TEAmamos | Rotina, cuidado e previsibilidade para pessoas neurodivergentes",
    description:
      "Plataforma em construção para apoiar pessoas neurodivergentes, famílias, cuidadores, escolas e profissionais com mais previsibilidade e organização.",
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
