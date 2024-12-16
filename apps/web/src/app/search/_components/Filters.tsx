'use client'

import { SearchParams } from '@/lib/shared-types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface FiltersProps {
  searchParams: SearchParams
}

export default function Filters({ searchParams }: FiltersProps) {
  return (
    <div className="flex gap-4">
      <PriceInput />
    </div>
  )
}

function PriceInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams?.get('price') || '')

  const updateURL = (newPrice: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (newPrice && newPrice === params.get('price')) {
      return
    }

    if (newPrice) {
      params.set('price', newPrice)
    } else {
      params.delete('price')
    }

    router.push(`/search?${params.toString()}`)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value)

  const handleSubmit = () => updateURL(inputValue)

  return (
    <div className="flex flex-col">
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        className="bg-slate-300"
        value={inputValue}
        onChange={handlePriceChange}
        onBlur={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit()
          }
        }}
      />
    </div>
  )
}
