'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Client } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	company: z.string().min(2, {
		message: 'Company name must be at least 2 characters.',
	}),
	website: z.string().url().optional().or(z.literal('')),
	logo: z.string().url().optional().or(z.literal('')),
	status: z.enum(['active', 'inactive']),
	stationIds: z.array(z.number()).default([]),
	apiKey: z.string().nullable(),
	apiKeyLastGenerated: z.date().nullable(),
})

type FormData = z.infer<typeof formSchema>

interface ClientFormProps {
	initialData?: Client
	stations?: { id: number; name: string }[]
	onSubmit: (data: Partial<Client>) => void
	onCancel: () => void
}

export default function ClientForm({ initialData, stations = [], onSubmit, onCancel }: ClientFormProps) {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData?.name || '',
			email: initialData?.email || '',
			company: initialData?.company || '',
			website: initialData?.website || '',
			logo: initialData?.logo || '',
			status: initialData?.status || 'active',
			stationIds: initialData?.stationIds || [],
			apiKey: initialData?.apiKey || null,
			apiKeyLastGenerated: initialData?.apiKeyLastGenerated || null,
		},
	})

	const handleGenerateApiKey = async () => {
		try {
			const response = await fetch(`/api/clients/${initialData?.id}/generate-key`, {
				method: 'POST',
			})
			const data = await response.json()
			if (data.apiKey) {
				form.setValue('apiKey', data.apiKey)
				form.setValue('apiKeyLastGenerated', new Date())
			}
		} catch (error) {
			console.error('Error generating API key:', error)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6 bg-[#1a1a1a] p-6 border border-gray-700 rounded-lg'>
				<div className='gap-6 grid'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Name</FormLabel>
								<FormControl>
									<Input placeholder='John Doe' {...field} />
								</FormControl>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Email</FormLabel>
								<FormControl>
									<Input placeholder='john@example.com' {...field} />
								</FormControl>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='company'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Company</FormLabel>
								<FormControl>
									<Input placeholder='Company Name' {...field} />
								</FormControl>
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
						name='logo'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Logo URL</FormLabel>
								<FormControl>
									<Input type='url' placeholder='https://example.com/logo.png' {...field} />
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
											<SelectValue placeholder='Select a status' />
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
						name='stationIds'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Stations</FormLabel>
								<Select
									onValueChange={value => field.onChange([...field.value, Number(value)])}
									value={field.value?.length ? String(field.value[0]) : undefined}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select stations' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{stations.map(station => (
											<SelectItem key={station.id} value={String(station.id)}>
												{station.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							<FormLabel>API Key</FormLabel>
							<Button type='button' onClick={handleGenerateApiKey} className='bg-red-700 hover:bg-red-800'>
								Generate New Key
							</Button>
						</div>
						<div className='bg-[#282828] p-4 rounded-md'>
							<code className='text-sm'>{form.watch('apiKey') || 'No API key generated'}</code>
						</div>
						{form.watch('apiKeyLastGenerated') && (
							<p className='text-gray-400 text-sm'>
								Last generated: {form.watch('apiKeyLastGenerated')?.toLocaleString()}
							</p>
						)}
					</div>
				</div>

				<div className='flex justify-end space-x-4 pt-6 border-gray-700 border-t'>
					<Button type='button' variant='outline' onClick={onCancel}>
						Cancel
					</Button>
					<Button type='submit'>{initialData ? 'Update Client' : 'Add Client'}</Button>
				</div>
			</form>
		</Form>
	)
}
