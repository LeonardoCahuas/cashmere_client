import Image from "next/image"
import Link from "next/link"
import { Instagram } from 'lucide-react'
import { Button } from "./Button"
import logo from './../../public/cashmere-color.svg'

const studioLinks = [
  { label: "Studio 1", href: "/studio/1" },
  { label: "Studio 2", href: "/studio/2" },
  { label: "Studio 3", href: "/studio/3" },
  { label: "Studio 4", href: "/studio/4" },
]

const serviceLinks = [
  { label: "Affitto sala", href: "" },
  { label: "Registrazione", href: "/service/1" },
  { label: "Mix & Master", href: "/service/2" },
  { label: "Produzione", href: "/service/3" },
]

const portfolioLinks = [
  { label: "Visualizza portfolio", href: "/portfolio" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 border-t border-t-2 border-t-gray-200 w-full  px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-72">
      <div className="py-16">
        {/* Logo Section */}
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <Image
            src={logo}
            alt="Cashmere Studio Logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h2 className="text-2xl font-semibold ">
            Cashmere Studio Milano
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Left Column - Book & Social */}
          <div className="lg:col-span-3 ">
            <Link href="/book">
            <Button variant="gradient">Prenota una sessione</Button>
            </Link>
            <p className="mt-8 text-sm">
              © 2025 Cashmere Studio Srl.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Center Columns - Links */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5 text-right">
            {/* Studi */}
            <div>
              <h3 className="mb-4 text-lg font-semibold ">Studi</h3>
              <ul className="space-y-2">
                {studioLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 transition-colors hover:text-black hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servizi */}
            <div>
              <h3 className="mb-4 text-lg font-semibold ">Servizi</h3>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 transition-colors hover:text-black hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portfolio */}
            <div>
              <h3 className="mb-4 text-lg font-semibold ">Portfolio</h3>
              <ul className="space-y-2">
                {portfolioLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 transition-colors hover:text-black hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Contacts */}
          <div className="lg:col-span-4 text-right">
            <h3 className="mb-4 text-lg font-semibold ">Contatti</h3>
            <div className="space-y-4 text-gray-400">
              <p>
                <a 
                  href="tel:+393514206294"
                  className="text-gray-400 transition-colors hover:text-black hover:underline"
                >
                  +39 351 420 6294
                </a>
              </p>
              <p>
                <a 
                  href="mailto:cashmerestudiomilano@gmail.com"
                  className="text-gray-400 transition-colors hover:text-black hover:underline"
                >
                  cashmerestudiomilano@gmail.com
                </a>
              </p>
              <p className="text-gray-400 transition-colors hover:text-black hover:underline">Via Oreste Salomone 61, 20183 Milano (MI)</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
