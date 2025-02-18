'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Client, Station } from '@/lib/types'
import Modal from '@/components/ui/Modal'
import ClientForm from '@/components/forms/ClientForm'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import LoadingWrapper from '@/components/ui/LoadingWrapper'
import { fetchApi } from '@/lib/api'
import { mockClients } from '@/lib/mock-data'
import { Button } from '@/components/ui'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function ClientsPage() {
	const router = useRouter()
	const [clients, setClients] = useState<Client[]>([])
	const [stations, setStations] = useState<Station[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [editingClient, setEditingClient] = useState<Client | null>(null)

	useEffect(() => {
		Promise.all([fetchClients(), fetchStations()]).finally(() => setLoading(false))
	}, [])

	const fetchClients = async () => {
		try {
			setError(null)

			// Use mock data in development
			if (process.env.NODE_ENV === 'development') {
				setClients(mockClients)
				return
			}

			const data = await fetchApi<Client[]>('/clients')
			setClients(data)
		} catch (error) {
			console.error('Error fetching clients:', error)
			if (error instanceof Error && error.message === 'Unauthorized') {
				router.push('/login')
			} else {
				setError('Failed to fetch clients. Please try again.')
			}
		}
	}

	const fetchStations = async () => {
		try {
			const response = await fetch('/api/stations')
			if (!response.ok) throw new Error('Failed to fetch stations')
			const data = await response.json()
			setStations(data)
		} catch (error) {
			console.error('Error fetching stations:', error)
		}
	}

	const handleAddClient = async (newClient: Partial<Client>) => {
		try {
			const response = await fetch('/api/clients', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newClient),
			})

			if (!response.ok) throw new Error('Failed to create client')

			const data = await response.json()
			setClients([...clients, data])
			setIsAddModalOpen(false)
		} catch (error) {
			console.error('Error creating client:', error)
		}
	}

	const handleEditClient = async (updatedClient: Partial<Client>) => {
		try {
			const response = await fetch(`/api/clients/${editingClient?.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedClient),
			})

			if (!response.ok) throw new Error('Failed to update client')

			const data = await response.json()
			setClients(clients.map(client => (client.id === editingClient?.id ? data : client)))
			setEditingClient(null)
		} catch (error) {
			console.error('Error updating client:', error)
		}
	}

	const handleDeleteClient = async (clientId: number) => {
		if (!confirm('Are you sure you want to delete this client?')) return

		try {
			const response = await fetch(`/api/clients/${clientId}`, {
				method: 'DELETE',
			})

			if (!response.ok) throw new Error('Failed to delete client')

			setClients(clients.filter(client => client.id !== clientId))
		} catch (error) {
			console.error('Error deleting client:', error)
		}
	}

	if (loading) {
		return <div>Loading clients...</div>
	}

	if (error) {
		return (
			<div className='text-red-600'>
				{error}
				<button onClick={fetchClients} className='ml-4 text-indigo-600 hover:text-indigo-800'>
					Retry
				</button>
			</div>
		)
	}

	return (
		<LoadingWrapper>
			<div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
				<div className='sm:flex sm:items-center'>
					<div className='sm:flex-auto'>
						<h1 className='font-semibold text-foreground text-2xl'>Clients</h1>
						<p className='mt-2 text-muted-foreground text-sm'>A list of all clients using RadioCopilot</p>
					</div>
					<div className='sm:flex-none mt-4 sm:mt-0 sm:ml-16'>
						<Button
							onClick={() => setIsAddModalOpen(true)}
							className='bg-red-700 hover:bg-red-800 rounded-full text-white'>
							<PlusIcon className='mr-2 w-4 h-4' />
							Add Client
						</Button>
					</div>
				</div>

				<div className='bg-card shadow-sm mt-8 ring-border rounded-lg ring-1 overflow-hidden'>
					<table className='divide-y divide-border min-w-full'>
						<thead className='bg-muted'>
							<tr>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Client
								</th>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Company
								</th>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Associated Stations
								</th>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Status
								</th>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-card divide-y divide-border'>
							{clients.map(client => (
								<tr key={client.id}>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='font-medium text-foreground text-sm'>{client.name}</div>
										<div className='text-muted-foreground text-sm'>{client.email}</div>
									</td>
									<td className='px-6 py-4 text-muted-foreground text-sm whitespace-nowrap'>
										{client.company}
									</td>
									<td className='px-6 py-4 text-muted-foreground text-sm whitespace-nowrap'>
										{client.stationIds
											?.map(id => stations.find(s => s.id === id)?.name)
											.filter(Boolean)
											.join(', ') || 'No stations'}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${client.status === 'active' ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'}`}>
											{client.status}
										</span>
									</td>
									<td className='px-6 py-4 font-medium text-sm whitespace-nowrap'>
										<button
											onClick={() => setEditingClient(client)}
											className='mr-4 text-primary hover:text-primary/80'>
											<PencilIcon className='w-5 h-5' />
										</button>
										<button
											onClick={() => handleDeleteClient(client.id)}
											className='text-destructive hover:text-destructive/80'>
											<TrashIcon className='w-5 h-5' />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add New Client'>
					<ClientForm stations={stations} onSubmit={handleAddClient} onCancel={() => setIsAddModalOpen(false)} />
				</Modal>

				<Modal isOpen={!!editingClient} onClose={() => setEditingClient(null)} title='Edit Client'>
					<ClientForm
						initialData={editingClient || undefined}
						stations={stations}
						onSubmit={handleEditClient}
						onCancel={() => setEditingClient(null)}
					/>
				</Modal>
			</div>
		</LoadingWrapper>
	)
}
