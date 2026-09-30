import type React from "react"
import type { Metadata } from "next"
import { Syne, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "VALENCE STUDIO — Avant-Garde Architecture & Digital Artifacts | Made by Quolytech",
  description: "Avant-garde digital studio and monolithic architectural archives. Engineered & Made by Quolytech.",
  authors: [{ name: "Quolytech" }],
  creator: "Quolytech",
  publisher: "Quolytech",
  icons: {
    icon: [
      {
        url: "/icon.svg?v=2",
        type: "image/svg+xml",
      },
      {
        url: "/icon-dark-32x32.png?v=2",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/icon.svg?v=2",
    apple: "/apple-icon.png?v=2",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
