'use client'

import LocationForm from '@/components/locations/LocationForm'
import { Button } from '@/components/ui'
import LoadingWrapper from '@/components/ui/LoadingWrapper'
import Modal from '@/components/ui/Modal'
import { COUNTRIES } from '@/lib/constants'
import { mockLocations } from '@/lib/mock-data'
import { Location } from '@/lib/types'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function LocationsPage() {
	const [locations, setLocations] = useState<Location[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [editingLocation, setEditingLocation] = useState<Location | null>(null)

	useEffect(() => {
		fetchLocations()
	}, [])

	const fetchLocations = async () => {
		try {
			setError(null)

			// Use mock data in development
			if (process.env.NODE_ENV === 'development') {
				setLocations([...mockLocations])
				setLoading(false)
				return
			}

			const response = await fetch('/api/locations')
			if (!response.ok) throw new Error('Failed to fetch locations')
			const data = await response.json()
			setLocations(data)
		} catch (error) {
			console.error('Error fetching locations:', error)
			setError(error instanceof Error ? error.message : 'Failed to fetch locations')
		} finally {
			setLoading(false)
		}
	}

	const handleAddLocation = async (newLocation: Partial<Location>) => {
		try {
			const response = await fetch('/api/locations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newLocation),
			})
			const data = await response.json()
			setLocations([...locations, data])
			setIsAddModalOpen(false)
		} catch (error) {
			console.error('Error adding location:', error)
		}
	}

	const handleEditLocation = async (updatedLocation: Partial<Location>) => {
		try {
			if (!editingLocation?.id) return

			const response = await fetch(`/api/locations/${editingLocation.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: updatedLocation.name,
					country: updatedLocation.country,
					city: updatedLocation.city,
					timezone: updatedLocation.timezone,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to update location')
			}

			const data = await response.json()

			setLocations(locations.map(location => (location.id === editingLocation.id ? data : location)))
			setEditingLocation(null)
		} catch (error) {
			console.error('Error updating location:', error)
			// Optionally add error handling UI here
		}
	}

	const handleDeleteLocation = async (locationId: number) => {
		if (!confirm('Are you sure you want to delete this location?')) return

		try {
			await fetch(`/api/locations/${locationId}`, {
				method: 'DELETE',
			})
			setLocations(locations.filter(location => location.id !== locationId))
		} catch (error) {
			console.error('Error deleting location:', error)
		}
	}

	return (
		<LoadingWrapper>
			<div className='space-y-6'>
				<div className='flex justify-between items-center'>
					<h1 className='font-semibold text-gray-200 text-2xl'>Locations</h1>
					<Button
						onClick={() => setIsAddModalOpen(true)}
						className='inline-flex justify-center items-center bg-red-700 hover:bg-red-800 disabled:opacity-50 px-4 py-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 h-10 font-medium text-white text-sm transition-colors disabled:pointer-events-none'>
						<PlusIcon className='mr-2 w-4 h-4' />
						Add Location
					</Button>
				</div>

				{locations.length === 0 ? (
					<div className='bg-card p-6 border border-border rounded-lg text-muted-foreground text-center'>
						No locations found. Add your first location to get started.
					</div>
				) : (
					<div className='bg-card border border-border rounded-lg overflow-hidden'>
						<table className='w-full'>
							<thead className='bg-muted'>
								<tr>
									<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
										Name
									</th>
									<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
										Country
									</th>
									<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
										City
									</th>
									<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
										Timezone
									</th>
									<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-border'>
								{locations.map(location => (
									<tr key={location.id}>
										<td className='px-6 py-4 text-foreground text-sm'>{location.name}</td>
										<td className='px-6 py-4 text-muted-foreground text-sm'>
											{COUNTRIES[location.country as keyof typeof COUNTRIES] || location.country}
										</td>
										<td className='px-6 py-4 text-muted-foreground text-sm'>{location.city}</td>
										<td className='px-6 py-4 text-muted-foreground text-sm'>{location.timezone}</td>
										<td className='px-6 py-4 text-sm'>
											<div className='flex items-center gap-2'>
												<button
													onClick={() => setEditingLocation(location)}
													className='p-2 hover:text-primary'>
													<PencilIcon className='w-5 h-5' />
												</button>
												<button
													onClick={() => handleDeleteLocation(location.id)}
													className='p-2 hover:text-destructive'>
													<TrashIcon className='w-5 h-5' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add Location'>
					<LocationForm
						onSubmit={async data => {
							await handleAddLocation(data)
							setIsAddModalOpen(false)
						}}
					/>
				</Modal>

				<Modal isOpen={!!editingLocation} onClose={() => setEditingLocation(null)} title='Edit Location'>
					{editingLocation && (
						<LocationForm
							initialData={editingLocation}
							onSubmit={async data => {
								await handleEditLocation(data)
								setEditingLocation(null)
							}}
						/>
					)}
				</Modal>
			</div>
		</LoadingWrapper>
	)
}
