'use client'

import StationForm from '@/components/forms/StationForm'
import { Button } from "@/components/ui"
import Modal from '@/components/ui/Modal'
import { Client, Location, Station } from '@/lib/types'
import { PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from 'react'

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingStation, setEditingStation] = useState<Station | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting data fetch...');

        const locResponse = await fetch('/api/locations')
        console.log('Location response status:', locResponse.status);
        if (!locResponse.ok) throw new Error('Failed to fetch locations')
        const locData = await locResponse.json()
        console.log('Fetched locations in StationsPage:', locData)
        if (!Array.isArray(locData) || locData.length === 0) {
          console.warn('No locations found or invalid data format')
          console.log('locData type:', typeof locData, 'value:', locData);
        }
        setLocations(locData)

        const clientResponse = await fetch('/api/clients')
        if (!clientResponse.ok) throw new Error('Failed to fetch clients')
        const clientData = await clientResponse.json()
        console.log('Fetched clients in StationsPage:', clientData)
        setClients(clientData)

        const stationResponse = await fetch('/api/stations')
        if (!stationResponse.ok) throw new Error('Failed to fetch stations')
        const stationData = await stationResponse.json()
        console.log('Fetched stations:', stationData)
        setStations(stationData)
      } catch (error) {
        console.error('Error fetching data:', error, 
          'Stack:', error instanceof Error ? error.stack : 'No stack trace')
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddStation = async (newStation: Partial<Station>) => {
    try {
      const response = await fetch('/api/stations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStation),
      })
      const data = await response.json()
      setStations([...stations, data])
    } catch (error) {
      console.error('Error adding station:', error)
    }
  }

  const handleEditStation = (updatedStation: Partial<Station>) => {
    setStations(stations.map(station => 
      station.id === editingStation?.id 
        ? { ...station, ...updatedStation }
        : station
    ))
    setEditingStation(null)
  }

  const handleDeleteStation = async (stationId: number) => {
    if (confirm('Are you sure you want to delete this station?')) {
      try {
        const response = await fetch(`/api/stations/${stationId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete station')
        }

        setStations(stations.filter(station => station.id !== stationId))
      } catch (error) {
        console.error('Error deleting station:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading stations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-foreground text-2xl">Radio Stations</h1>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-red-700 hover:bg-red-800 rounded-full text-white"
        >
          <PlusIcon className="mr-2 w-4 h-4" />
          Add Station
        </Button>
      </div>

      {stations.length === 0 ? (
        <div className="bg-[#282828] p-6 border border-gray-700 rounded-lg text-gray-400 text-center">
          No stations found. Add your first station to get started.
        </div>
      ) : (
        <div className="bg-[#282828] border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-400 text-xs text-left uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 font-medium text-gray-400 text-xs text-left uppercase tracking-wider">Station ID</th>
                <th className="px-6 py-3 font-medium text-gray-400 text-xs text-left uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 font-medium text-gray-400 text-xs text-left uppercase tracking-wider">Website</th>
                <th className="px-6 py-3 font-medium text-gray-400 text-xs text-left uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 font-medium text-gray-400 text-xs text-left uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {stations.map((station) => {
                const location = locations.find(l => l.id === station.locationId)
                return (
                  <tr 
                    key={station.id}
                    className="hover:bg-[#1a1a1a] transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-gray-200 text-sm">{station.name}</td>
                    <td className="px-6 py-4 text-gray-200 text-sm">{station.stationId}</td>
                    <td className="px-6 py-4 text-gray-200 text-sm">{location?.city}, {location?.country}</td>
                    <td className="px-6 py-4 text-gray-200 text-sm">{station.website}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        station.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {station.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingStation(station)}
                          className="text-gray-400 hover:text-gray-200"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStation(station.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Station"
      >
        <StationForm
          locations={locations}
          clients={clients}
          onSubmit={handleAddStation}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingStation}
        onClose={() => setEditingStation(null)}
        title="Edit Station"
      >
        <StationForm
          initialData={editingStation || undefined}
          locations={locations}
          clients={clients}
          onSubmit={handleEditStation}
          onCancel={() => setEditingStation(null)}
        />
      </Modal>
    </div>
  )
} 