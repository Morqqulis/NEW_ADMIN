'use client'

import { useState } from 'react'
import { Voice } from '@/lib/types'
import { mockVoices } from '@/lib/mockData'
import Modal from '@/components/ui/Modal'
import VoiceForm from '@/components/forms/VoiceForm'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { COUNTRIES } from '@/lib/countries'
import { Button } from '@/components/ui'

export default function VoicesPage() {
  const [voices, setVoices] = useState<Voice[]>(mockVoices)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVoice, setEditingVoice] = useState<Voice | null>(null)

  const handleAdd = () => {
    setEditingVoice(null)
    setIsModalOpen(true)
  }

  const handleEdit = (voice: Voice) => {
    setEditingVoice(voice)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setVoices(voices.filter(voice => voice.id !== id))
  }

  const handleSubmit = (voiceData: Partial<Voice>) => {
    if (editingVoice) {
      setVoices(voices.map(voice => 
        voice.id === editingVoice.id ? { ...voice, ...voiceData } : voice
      ))
    } else {
      setVoices([...voices, { id: Math.random().toString(), ...voiceData } as Voice])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-200">Voices</h1>
        <Button 
          onClick={handleAdd}
          className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4 bg-red-700 hover:bg-red-800 text-white rounded-full"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Voice
        </Button>
      </div>

      <div className="rounded-md border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-[#1a1a1a]">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Voice ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Language/Accent</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Country</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {voices.map((voice) => (
                <tr key={voice.id} className="hover:bg-[#1a1a1a]">
                  <td className="py-3 px-4 text-sm text-gray-200">{voice.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{voice.voiceId}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{voice.category}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-200">{voice.language}</div>
                    {voice.accent && (
                      <div className="text-sm text-gray-400">{voice.accent}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {voice.country}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${voice.status === 'active' 
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {voice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(voice)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(voice.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVoice ? 'Edit Voice' : 'Add Voice'}
      >
        <VoiceForm
          initialData={editingVoice || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
} 