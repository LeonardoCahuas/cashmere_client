import { NavbarVariants } from '@/components/navbar/Navbar'
import Header from './_components/Header'
import { StudiosSection } from './_components/sections/StudiosSection'
import { Paragraph } from './_components/sections/Paragraph'
import ServicesSection from './_components/sections/ServicesSection'
import PortfolioGrid from './_components/sections/PortfolioSection'
import Footer from '@/components/Footer'
import MapsSection from './_components/sections/MapsSection'

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavbarVariants variant="Home" />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className='flex flex-col gap-32 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-72 py-32'>
          <StudiosSection />
          <Paragraph/>
          <ServicesSection/>
          <MapsSection/>
          <PortfolioGrid/>
        </div>
        <Footer/>
      </div>
    </div>
  )
}
