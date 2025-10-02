import type { Metadata } from "next";
import "@/app/globals.css";

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'], 
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: "eAIP Issues",
  description: "A list of eAIP issues from the AIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
