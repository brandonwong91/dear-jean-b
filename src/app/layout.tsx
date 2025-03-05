import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hello Kitty's Kawaii World",
  description:
    "Welcome to a cute and kawaii world filled with Hello Kitty charm! Experience the adorable pink aesthetic and joyful atmosphere.",
  keywords: [
    "Hello Kitty",
    "kawaii",
    "cute",
    "pink",
    "adorable",
    "dear-jean-b",
  ],
  openGraph: {
    title: "Hello Kitty's Kawaii World",
    description:
      "Welcome to a cute and kawaii world filled with Hello Kitty charm!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
