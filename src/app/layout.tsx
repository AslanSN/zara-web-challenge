'use client'

// eslint-disable-next-line camelcase
import { Roboto_Condensed } from 'next/font/google'
import Navbar from '@/components/common/Navbar/Navbar'
import './globals.css'
import React from 'react'
import { CharactersContextProvider } from '@/contexts/CharactersContext/CharactersContext'

const robotoCondensed = Roboto_Condensed({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-roboto-condensed',
})

/**
 * Renders the root layout of the application.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The props object containing the children to render => Homepage, ./page.tsx.
 * @return {JSX.Element} The root layout JSX element.
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>): JSX.Element {
	return (
		<html lang="en">
			<body className={robotoCondensed.className}>
				<CharactersContextProvider>
					<Navbar />
					{children}
				</CharactersContextProvider>
			</body>
		</html>
	)
}
