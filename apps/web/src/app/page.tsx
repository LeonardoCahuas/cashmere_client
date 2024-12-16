import { NavBar } from '@/components/navbar/Navbar'
import { SearchCard } from './_components/SearchCard'

export default function Home() {
  return (
    <div className="bg-gray-100 h-screen w-screen">
      <NavBar />
      <SearchCard />
    </div>
  )
}
