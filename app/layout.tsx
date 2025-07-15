import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { SessionContextProvider } from "@/context/session-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Journee - Travel Adventures",
  description: "Sign up for Journee and discover your next travel adventure"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionContextProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <div className="fixed top-0 z-50 w-[99%] mx-[0.5%] mt-[0.2%]">
            <Navbar />
          </div>
          {children}
        </body>
      </html>
    </SessionContextProvider>
  )
}
