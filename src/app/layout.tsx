import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'RadioCopilot Admin Dashboard',
	description: 'Admin dashboard for managing RadioCopilot clients, stations, and AI voices',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark'>
			<body className={`${inter.className} bg-[#121212] text-white`}>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
