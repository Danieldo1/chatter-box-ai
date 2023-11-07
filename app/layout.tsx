import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/ModalProvider'



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
      <body >
        <ModalProvider />
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
