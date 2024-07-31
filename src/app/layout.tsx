'use client'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import React from 'react'
import { CharactersContextProvider } from '@/contexts/CharactersContext/CharactersContext'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
// 	title: 'Zara web challenge',
// 	description: 'A web challenge for Inditex enterprise',
// }

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<CharactersContextProvider>
					<Navbar />
					{children}
				</CharactersContextProvider>
			</body>
		</html>
	)
}
