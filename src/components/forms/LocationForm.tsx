'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Location } from '@/lib/types'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  code: z.string().length(2, {
    message: "Code must be exactly 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

interface LocationFormProps {
  initialData?: Location
  onSubmit: (data: Partial<Location>) => void
  onCancel: () => void
}

export default function LocationForm({ initialData, onSubmit, onCancel }: LocationFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: initialData?.code || "",
      city: initialData?.city || "",
      country: initialData?.country || "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-[#1a1a1a] p-6 rounded-lg border border-gray-700">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Country Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="NL" 
                    {...field} 
                    maxLength={2}
                    style={{ textTransform: 'uppercase' }}
                    onChange={e => field.onChange(e.target.value.toUpperCase())}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">City</FormLabel>
                <FormControl>
                  <Input placeholder="Amsterdam" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Country</FormLabel>
                <FormControl>
                  <Input placeholder="Netherlands" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Location' : 'Add Location'}
          </Button>
        </div>
      </form>
    </Form>
  )
} 