'use client'

import { useState } from 'react'
import { Button } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [apiKey, setApiKey] = useState("rcp_c02c06d561db245fa6891f61e5")

  const handleCopyApiKey = async () => {
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateApiKey = () => {
    const randomStr = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 24)
    return `rcp_${randomStr}`
  }

  const handleGenerateNewApiKey = () => {
    const newKey = generateApiKey()
    setApiKey(newKey)
    // Here you would typically make an API call to save the new key
    // For example:
    // await fetch('/api/settings/generate-key', { method: 'POST' })
  }

  const handleSave = async () => {
    setLoading(true)
    // Add your save logic here
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            <div className="rounded-md border border-gray-800 bg-[#1a1a1a] p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Station Name</Label>
                  <Input 
                    placeholder="Enter station name"
                    className="bg-[#282828] border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select>
                    <SelectTrigger className="bg-[#282828] border-gray-700">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-gray-700">
                      <SelectItem value="en" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        English
                      </SelectItem>
                      <SelectItem value="de" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        German
                      </SelectItem>
                      <SelectItem value="fr" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        French
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select>
                    <SelectTrigger className="bg-[#282828] border-gray-700">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-gray-700">
                      <SelectItem value="utc" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        UTC
                      </SelectItem>
                      <SelectItem value="est" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        Eastern Time
                      </SelectItem>
                      <SelectItem value="cet" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        Central European Time
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="space-y-6">
            <div className="rounded-md border border-gray-800 bg-[#1a1a1a] p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <Select>
                    <SelectTrigger className="bg-[#282828] border-gray-700">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-gray-700">
                      <SelectItem value="instant" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        Instant
                      </SelectItem>
                      <SelectItem value="daily" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        Daily Digest
                      </SelectItem>
                      <SelectItem value="weekly" className="text-gray-200 hover:bg-[#282828] focus:bg-[#282828]">
                        Weekly Summary
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Notification Email</Label>
                  <Input 
                    type="email"
                    placeholder="Enter email address"
                    className="bg-[#282828] border-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 