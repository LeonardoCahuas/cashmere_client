import Image from "next/image"

interface PortfolioCardProps {
  title: string
  artist: string
  imageUrl: string
  tags: string[]
}

export default function PortfolioCard({ title, artist, imageUrl, tags }: PortfolioCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border  border-[1px] border-gray-200 hover:border-black transition p-4 border border-[1px] border-gray-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400">{artist}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#6FC7DF]/10 px-3 py-1 text-xs font-medium text-[#6FC7DF]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

