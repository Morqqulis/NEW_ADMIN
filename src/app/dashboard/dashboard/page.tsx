'use client'

import { mockClients, mockStations, mockVoices } from '@/lib/mockData'
import { ChartBarIcon, MicrophoneIcon, RadioIcon, SignalIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TimeDisplay } from '../../../components/ui/TimeDisplay'

const COLORS = ['#dc2626', '#059669', '#2563eb', '#d97706'] // red, emerald, blue, amber

const mockUsageData = [
	{ name: 'Mon', broadcasts: 240 },
	{ name: 'Tue', broadcasts: 300 },
	{ name: 'Wed', broadcasts: 280 },
	{ name: 'Thu', broadcasts: 320 },
	{ name: 'Fri', broadcasts: 290 },
	{ name: 'Sat', broadcasts: 220 },
	{ name: 'Sun', broadcasts: 200 },
]

const mockVoiceUsage = [
	{ name: 'News', value: 400 },
	{ name: 'Weather', value: 300 },
	{ name: 'Traffic', value: 200 },
	{ name: 'Other', value: 100 },
]

export default function DashboardPage() {
	const activeStations = mockStations.filter(s => s.status === 'active').length
	const activeVoices = mockVoices.filter(v => v.status === 'active').length
	const activeClients = mockClients.filter(c => c.status === 'active').length

	const stats = [
		{
			name: 'Total Stations',
			value: activeStations,
			total: mockStations.length,
			icon: RadioIcon,
			color: 'bg-red-800',
		},
		{
			name: 'Active Voices',
			value: activeVoices,
			total: mockVoices.length,
			icon: MicrophoneIcon,
			color: 'bg-red-700',
		},
		{
			name: 'Active Clients',
			value: activeClients,
			total: mockClients.length,
			icon: UsersIcon,
			color: 'bg-red-600',
		},
	]

	return (
		<div className={`space-y-6`}>
			<div className={`flex items-center justify-between`}>
				<h1 className={`text-2xl font-semibold text-foreground`}>Dashboard</h1>
				<TimeDisplay />
			</div>

			{/* Stats Cards */}

			<div className='gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
				{stats.map(stat => (
					<div key={stat.name} className='stats-card'>
						<dt>
							<div className={`absolute rounded-xl p-3 ${stat.color}`}>
								<stat.icon className='w-6 h-6 text-white' />
							</div>
							<p className='ml-16 font-medium text-muted-foreground text-sm truncate'>{stat.name}</p>
						</dt>
						<dd className='flex items-baseline ml-16'>
							<p className='font-semibold text-foreground text-2xl'>{stat.value}</p>
							<p className='ml-2 text-muted-foreground text-sm'>of {stat.total}</p>
						</dd>
					</div>
				))}
			</div>

			{/* Charts */}
			<div className='gap-5 grid grid-cols-1 lg:grid-cols-2'>
				{/* Broadcasts Chart */}
				<div className='stats-card'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='font-medium text-foreground text-lg'>Weekly Broadcasts</h2>
						<SignalIcon className='w-5 h-5 text-muted-foreground' />
					</div>
					<div className='h-80'>
						<ResponsiveContainer width='100%' height='100%'>
							<BarChart data={mockUsageData}>
								<CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' />
								<XAxis dataKey='name' stroke='hsl(var(--muted-foreground))' />
								<YAxis stroke='hsl(var(--muted-foreground))' />
								<Tooltip
									contentStyle={{
										backgroundColor: 'hsl(var(--card))',
										borderColor: 'hsl(var(--border))',
										color: 'hsl(var(--foreground))',
									}}
								/>
								<Bar dataKey='broadcasts' fill='hsl(var(--primary))' />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Voice Usage Chart */}
				<div className='stats-card'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='font-medium text-foreground text-lg'>Voice Usage by Type</h2>
						<ChartBarIcon className='w-5 h-5 text-muted-foreground' />
					</div>
					<div className='h-80'>
						<ResponsiveContainer width='100%' height='100%'>
							<PieChart>
								<Pie data={mockVoiceUsage} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey='value'>
									{mockVoiceUsage.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: 'hsl(var(--card))',
										borderColor: 'hsl(var(--border))',
										color: 'hsl(var(--foreground))',
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
						<div className='flex justify-center space-x-6'>
							{mockVoiceUsage.map((entry, index) => (
								<div key={entry.name} className='flex items-center'>
									<div
										className='mr-2 rounded-full w-3 h-3'
										style={{ backgroundColor: COLORS[index % COLORS.length] }}
									/>
									<span className='text-muted-foreground text-sm'>{entry.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Recent Activity */}
			<div className='stats-card'>
				<h2 className='mb-4 font-medium text-foreground text-lg'>Recent Activity</h2>
				<div className='flow-root'>
					<ul className='-mb-8'>
						{[
							{ event: 'New broadcast completed', station: 'Radio NYC', time: '5 minutes ago' },
							{ event: 'Voice updated', station: 'London FM', time: '2 hours ago' },
							{ event: 'New client added', station: 'Berlin Radio', time: '4 hours ago' },
						].map((activity, activityIdx) => (
							<li key={activityIdx}>
								<div className='relative pb-8'>
									{activityIdx !== 2 ? (
										<span
											className='top-4 left-4 absolute -ml-px bg-border w-0.5 h-full'
											aria-hidden='true'
										/>
									) : null}
									<div className='relative flex space-x-3'>
										<div>
											<span className='flex justify-center items-center bg-primary rounded-xl w-8 h-8'>
												<RadioIcon className='w-4 h-4 text-primary-foreground' />
											</span>
										</div>
										<div className='flex flex-1 justify-between space-x-4 pt-1.5 min-w-0'>
											<div>
												<p className='text-muted-foreground text-sm'>
													{activity.event}{' '}
													<span className='font-medium text-foreground'>{activity.station}</span>
												</p>
											</div>
											<div className='text-muted-foreground text-sm whitespace-nowrap'>{activity.time}</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
