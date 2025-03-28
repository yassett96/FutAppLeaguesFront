import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ligas Futapp",
  description: "Gestión de ligas y torneos con Next.js y algo de Bootstrap",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon-32x32.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
