'use client'
import { Inter } from 'next/font/google'
import Navbar from '@/components/common/Navbar/Navbar'
import './globals.css'
import React from 'react'
import { CharactersContextProvider } from '@/contexts/CharactersContext/CharactersContext'

const inter = Inter({ subsets: ['latin'] })


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
