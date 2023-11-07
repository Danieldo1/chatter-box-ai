import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/ModalProvider'
import { ToasterProvider } from '@/components/ToasterProvider'
import { CrispProvider } from '@/components/CrispProvider'



export const metadata: Metadata = {
  title: 'ChatterBot',
  description: 'ChatterBot is a new revolutionary chat bot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <CrispProvider />
      <body >
        <ModalProvider />
        <ToasterProvider />
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
