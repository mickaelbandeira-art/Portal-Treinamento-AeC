import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Corporativo AeC",
  description: "Portal de Treinamento, Formação e Desenvolvimento",
};

import { AIChatBot } from "@/components/ui/chat-bot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        {children}
        <AIChatBot />
      </body>
    </html>
  );
}
