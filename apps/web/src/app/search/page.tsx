import { NavBar } from '@/components/navbar/Navbar'
import { SearchParams } from '@/lib/shared-types'
import Filters from './_components/Filters'

export default async function Search({ searchParams }: { searchParams: SearchParams }) {
  const { price } = searchParams
  const x = Math.floor(Math.random() * 100)
  return (
    <Layout>
      <NavBar />
      <Controls>
        {x}
        <Filters searchParams={searchParams} />
      </Controls>
      <Results>price: {price}</Results>
    </Layout>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-screen">{children}</div>
}

function Controls({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-8 border-b border-gray-200">{children}</div>
}

function Results({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>
}
