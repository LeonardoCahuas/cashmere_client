"use client"

import Image from "next/image"

interface ServiceCardProps {
  title: string
  description: string
  imageUrl: string
  selected: boolean
  onSelect: () => void
}

export default function ServiceCard({
  title,
  description,
  imageUrl,
  selected,
  onSelect
}: ServiceCardProps) {

  return (
    <div className={`flex flex-row gap-4 p-6 border border-${selected ? 'border-[1px] border-black' : 'hover:border-black border-[1px]'} rounded-lg transition`} onClick={onSelect}>
      <div className="w-1/6 aspect-square p-8">
        <Image
          src={imageUrl || "/Studio 1/1.jpg"}
          alt={title}
          width={200}
          height={200}
          className="object-square object-cover transition-transform duration-300 hover:scale-105 rounded-md"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 w-3/5 justify-center">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-end px-4">
        <div className={`rounded-full aspect-square border border-[1px] border-gray-400 flex flex-col items-center justify-center bg-${selected ? 'black' : 'white'} text-white text-xl`}>
          &#10003;
        </div>
      </div>
    </div>
  )
}
