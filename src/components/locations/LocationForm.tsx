'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { COUNTRIES, type City, type Country } from '@/lib/countries'
import { useState } from 'react'
import { z } from 'zod'

interface LocationFormData {
  name: string;
  code?: string;
  city: string;
  country: string;
  timezone?: string;
}

const formSchema = z.object({
  name: z.string(),
  code: z.string().optional(),
  city: z.string(),
  country: z.string(),
  timezone: z.string().optional()
})

interface LocationFormProps {
  onSubmit: (data: { code?: string; city: string; country: string; timezone?: string }) => void
  initialData?: {
    code?: string
    city: string
    country: string
    timezone?: string
  }
}

export default function LocationForm({ onSubmit, initialData }: LocationFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    initialData ? COUNTRIES.find(c => c.code === initialData.country) || null : null
  )
  const [selectedCity, setSelectedCity] = useState<City | null>(
    initialData && selectedCountry 
      ? selectedCountry.cities.find(c => c.name === initialData.city) || null 
      : null
  )

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find(c => c.code === countryCode) || null
    setSelectedCountry(country)
    setSelectedCity(null)
  }

  const handleCityChange = (cityName: string) => {
    if (!selectedCountry) return
    const city = selectedCountry.cities.find(c => c.name === cityName) || null
    setSelectedCity(city)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCountry || !selectedCity) return

    onSubmit({
      code: selectedCity.code,
      city: selectedCity.name,
      country: selectedCountry.code,
      timezone: selectedCity.timezone
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Country</Label>
        <Select
          value={selectedCountry?.code || ''}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className="bg-[#282828] border-gray-700">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-gray-700">
            {COUNTRIES.map((country) => (
              <SelectItem 
                key={country.code} 
                value={country.code}
                className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200"
              >
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>City</Label>
        <Select
          value={selectedCity?.name || ''}
          onValueChange={handleCityChange}
          disabled={!selectedCountry}
        >
          <SelectTrigger className="bg-[#282828] border-gray-700">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-gray-700">
            {selectedCountry?.cities.map((city) => (
              <SelectItem 
                key={city.code} 
                value={city.name}
                className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200"
              >
                {city.name} ({city.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Location Code</Label>
        <div className="flex items-center bg-[#282828] px-3 border border-gray-700 rounded-md h-9 text-sm">
          {selectedCity?.code || ''}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Timezone</Label>
        <div className="flex items-center bg-[#282828] px-3 border border-gray-700 rounded-md h-9 text-sm">
          {selectedCity?.timezone || ''}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={!selectedCountry || !selectedCity}
      >
        {initialData ? 'Update Location' : 'Add Location'}
      </Button>
    </form>
  )
} 