'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export default function Header() {
	const router = useRouter()

	const handleLogout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
			})

			if (response.ok) {
				router.push('/login')
			}
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	return (
		<header className='top-0 z-50 sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 w-full'>
			<div className='flex items-center h-14 container'>
				<div className='flex mr-4'>
					<Link className='flex items-center space-x-2 mr-6' href='/'></Link>
				</div>
				<div className='flex flex-1 justify-between md:justify-end items-center space-x-2'>
					<div className='flex-1 md:flex-none w-full md:w-auto'></div>
					<Menu as='div' className='relative'>
						<Menu.Button as={ShimmerButton} variant='outline' size='sm' className='gap-2'>
							<UserCircleIcon className='w-5 h-5' />
							<span>Profile</span>
						</Menu.Button>
						<Transition
							as={Fragment}
							enter='transition ease-out duration-100'
							enterFrom='transform opacity-0 scale-95'
							enterTo='transform opacity-100 scale-100'
							leave='transition ease-in duration-75'
							leaveFrom='transform opacity-100 scale-100'
							leaveTo='transform opacity-0 scale-95'>
							<Menu.Items className='right-0 absolute bg-card ring-opacity-5 shadow-lg mt-2 py-1 rounded-md focus:outline-none ring-1 ring-black w-48 origin-top-right'>
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={handleLogout}
											className={`${
												active ? 'bg-secondary' : ''
											} block w-full px-4 py-2 text-left text-sm text-foreground`}>
											Sign out
										</button>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
		</header>
	)
}
