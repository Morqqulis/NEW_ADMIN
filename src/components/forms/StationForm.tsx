'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Client, Location, Station } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface StationWithPrompts extends Station {
	[key: string]: any // для динамических ключей промптов
	hourlyPrompt0?: string
	hourlyPrompt10?: string
	hourlyPrompt20?: string
	hourlyPrompt30?: string
	hourlyPrompt40?: string
	hourlyPrompt50?: string
	hourlyPrompt55?: string
	newsPrompt?: string
	weatherPrompt?: string
	trafficPrompt?: string
}

const formSchema = z.object({
	name: z.string().min(2),
	locationId: z.number(),
	website: z.string().url().optional().or(z.literal('')),
	status: z.enum(['active', 'inactive']),
	omniplayerUrl: z.string().url().optional().or(z.literal('')),
	clientId: z.number(), // изменено на string
	clientSecret: z.string().min(1),
	username: z.string().min(1),
	password: z.string().min(1),
	systemPrompt: z.string().optional(),
	prompts: z
		.array(
			z.object({
				id: z.string(),
				label: z.string(),
				content: z.string(),
				isActive: z.boolean(),
				lastModified: z.date(),
			}),
		)
		.optional(),
})

type FormData = z.infer<typeof formSchema>

interface StationFormProps {
	initialData?: StationWithPrompts
	locations: Location[]
	clients: Client[]
	onSubmit: (data: Partial<Station>) => void
	onCancel: () => void
}

export default function StationForm({ initialData, locations, clients, onSubmit, onCancel }: StationFormProps) {
	console.log('StationForm props:', {
		locationCount: locations?.length,
		locationSample: locations?.[0],
		clientCount: clients?.length,
		clientSample: clients?.[0],
		initialData,
	})
	console.log('StationForm received locations:', locations)
	const [activeTab, setActiveTab] = useState('general')
	const [prompts, setPrompts] = useState([])
	const [loading, setLoading] = useState(true)
	const [formData, setFormData] = useState<Partial<StationWithPrompts>>(initialData || {})
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData?.name || '',
			locationId: initialData?.locationId || 0,
			website: initialData?.website || '',
			status: initialData?.status || 'active',
			omniplayerUrl: initialData?.omniplayerUrl || '',
			clientId: Number(initialData?.clientId) || 0,
			clientSecret: initialData?.clientSecret || '',
			username: initialData?.username || '',
			password: initialData?.password || '',
			systemPrompt: initialData?.systemPrompt || '',
			prompts: initialData?.prompts || [],
		},
	})

	useEffect(() => {
		fetchPrompts()
	}, [])

	const fetchPrompts = async () => {
		try {
			const response = await fetch('/api/prompts')
			if (!response.ok) throw new Error('Failed to fetch prompts')
			const data = await response.json()
			setPrompts(data)
		} catch (error) {
			console.error('Error fetching prompts:', error)
		} finally {
			setLoading(false)
		}
	}

	function handleSubmit(values: FormData) {
		onSubmit({
			...values,
			id: initialData?.id,
			clientId: values.clientId ? values.clientId.toString() : undefined,
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				<Tabs defaultValue='general' value={activeTab} onValueChange={setActiveTab} className='w-full'>
					<TabsList className='grid grid-cols-2 w-full'>
						<TabsTrigger value='general'>General</TabsTrigger>
						<TabsTrigger value='prompts'>Prompts</TabsTrigger>
					</TabsList>

					<TabsContent value='general' className='space-y-6 bg-[#1a1a1a] p-6 border border-gray-700 rounded-lg'>
						{!locations?.length && (
							<div className='mb-4 text-yellow-500'>
								Warning: No locations available. Please add locations first.
							</div>
						)}
						<div className='gap-6 grid'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Name</FormLabel>
										<FormControl>
											<Input placeholder='Station Name' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='locationId'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Location</FormLabel>
										<Select
											value={field.value?.toString() || ''}
											onValueChange={value => {
												field.onChange(parseInt(value))
											}}>
											<FormControl>
												<SelectTrigger className='bg-[#282828] border-gray-700'>
													<SelectValue placeholder='Select a location' />
												</SelectTrigger>
											</FormControl>
											<SelectContent className='bg-[#1a1a1a] border-gray-700'>
												{locations?.length > 0 ? (
													locations.map(location => (
														<SelectItem
															key={location.id}
															value={location.id.toString()}
															className='hover:bg-[#282828] focus:bg-[#282828] text-gray-200'>
															{location.name} ({location.city}, {location.country})
														</SelectItem>
													))
												) : (
													<SelectItem value='' disabled>
														No locations available
													</SelectItem>
												)}
											</SelectContent>
										</Select>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='website'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Website</FormLabel>
										<FormControl>
											<Input type='url' placeholder='https://example.com' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='status'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Status</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select status' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='active'>Active</SelectItem>
												<SelectItem value='inactive'>Inactive</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='omniplayerUrl'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Omniplayer URL</FormLabel>
										<FormControl>
											<Input type='url' placeholder='Omniplayer URL' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='clientId'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Client</FormLabel>
										<Select
											value={field.value?.toString() || ''}
											onValueChange={value => {
												field.onChange(parseInt(value))
											}}>
											<FormControl>
												<SelectTrigger className='bg-[#282828] border-gray-700'>
													<SelectValue placeholder='Select a client' />
												</SelectTrigger>
											</FormControl>
											<SelectContent className='bg-[#1a1a1a] border-gray-700'>
												{clients?.length > 0 ? (
													clients.map(client => (
														<SelectItem
															key={client.id}
															value={client.id.toString()}
															className='hover:bg-[#282828] focus:bg-[#282828] text-gray-200'>
															{client.name}
														</SelectItem>
													))
												) : (
													<SelectItem value='' disabled>
														No clients available
													</SelectItem>
												)}
											</SelectContent>
										</Select>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='clientSecret'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Client Secret</FormLabel>
										<FormControl>
											<Input type='password' placeholder='Client Secret' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Username</FormLabel>
										<FormControl>
											<Input placeholder='Username' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Password</FormLabel>
										<FormControl>
											<Input type='password' placeholder='Password' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex justify-end space-x-4 pt-6 border-gray-700 border-t'>
							<Button type='button' variant='outline' onClick={onCancel}>
								Cancel
							</Button>
							<Button type='submit'>{initialData ? 'Update Station' : 'Add Station'}</Button>
						</div>
					</TabsContent>

					<TabsContent value='prompts' className='space-y-6 bg-[#1a1a1a] p-6 border border-gray-700 rounded-lg'>
						<div className='space-y-6'>
							{/* System Prompt */}
							<div className='space-y-2'>
								<Label>System Prompt</Label>
								<Input
									value={formData.systemPrompt || ''}
									onChange={e => setFormData({ ...formData, systemPrompt: e.target.value })}
									className='bg-[#282828] border-gray-700'
									placeholder='Enter system prompt'
								/>
							</div>

							{/* Hourly Prompts */}
							<div className='space-y-4'>
								<h3 className='font-medium text-gray-200 text-lg'>Hourly Prompts</h3>
								<div className='gap-4 grid grid-cols-2'>
									{[0, 10, 20, 30, 40, 50, 55].map(minute => (
										<div key={minute} className='space-y-2'>
											<Label>HH:{minute.toString().padStart(2, '0')}</Label>
											<Input
												value={formData[`hourlyPrompt${minute}`] || ''}
												onChange={e =>
													setFormData({ ...formData, [`hourlyPrompt${minute}`]: e.target.value })
												}
												className='bg-[#282828] border-gray-700'
												placeholder={`Enter prompt for XX:${minute}`}
											/>
										</div>
									))}
								</div>
							</div>

							{/* Other Prompts */}
							<div className='space-y-4'>
								<h3 className='font-medium text-gray-200 text-lg'>Other Prompts</h3>
								<div className='gap-4 grid grid-cols-2'>
									{['news', 'weather', 'traffic'].map(type => (
										<div key={type} className='space-y-2'>
											<Label className='capitalize'>{type} Prompt</Label>
											<Input
												value={formData[`${type}Prompt`] || ''}
												onChange={e => setFormData({ ...formData, [`${type}Prompt`]: e.target.value })}
												className='bg-[#282828] border-gray-700'
												placeholder={`Enter ${type} prompt`}
											/>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className='flex justify-end space-x-4'>
							<Button type='button' variant='outline' onClick={onCancel}>
								Cancel
							</Button>
							<Button type='submit'>Save Prompts</Button>
						</div>
					</TabsContent>
				</Tabs>
			</form>
		</Form>
	)
}
