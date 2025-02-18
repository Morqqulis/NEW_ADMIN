'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HeroGeometric } from '@/components/ui/shape-landing-hero'
import { motion } from 'framer-motion'
import AdminLogo from '@/assets/adminlogo.svg'

export default function LoginPage() {
	const router = useRouter()
	const [error, setError] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: formData.get('username'),
					password: formData.get('password'),
				}),
			})

			if (response.ok) {
				router.push('/')
				router.refresh()
			} else {
				setError('Invalid credentials')
			}
		} catch (error) {
			setError('An error occurred. Please try again.')
		}
	}

	return (
		<div className='relative min-h-screen'>
			<div className='absolute inset-0'>
				<HeroGeometric badge='' title1='' title2='' />
			</div>
			<div className='z-10 absolute inset-0 flex justify-center items-center'>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
					<div className='bg-black/30 shadow-xl backdrop-blur-xl p-6 border border-white/20 rounded-lg w-full max-w-sm'>
						<div className='flex justify-center mb-8'>
							<AdminLogo className='w-auto h-12' />
						</div>

						<form className='space-y-6' onSubmit={handleSubmit}>
							<div className='space-y-4'>
								<div>
									<label htmlFor='username' className='sr-only'>
										Username
									</label>
									<input
										id='username'
										name='username'
										type='text'
										required
										className='bg-black/30 px-4 py-2 border border-white/20 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 w-full text-white placeholder-white/60'
										placeholder='Username'
									/>
								</div>
								<div>
									<label htmlFor='password' className='sr-only'>
										Password
									</label>
									<input
										id='password'
										name='password'
										type='password'
										required
										className='bg-black/30 px-4 py-2 border border-white/20 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 w-full text-white placeholder-white/60'
										placeholder='Password'
									/>
								</div>
							</div>

							{error && <div className='text-rose-300 text-sm text-center'>{error}</div>}

							<button
								type='submit'
								className={`w-full px-4 py-2 text-sm font-medium text-white 
                bg-black/30 border border-white/20 rounded-lg hover:bg-white/20 
                focus:outline-none focus:ring-2 focus:ring-white/20 
                transition-colors duration-200 ease-in-out`}>
								Sign in
							</button>
						</form>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
