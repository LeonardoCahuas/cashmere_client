'use client'

import { useState } from 'react'
import { Button } from "@/components/Button"
import { Calendar, Phone, Music, Menu, Home, CheckCircle, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import Image from 'next/image'
import logo from '../../../public/cashmere-logo.svg'

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    icon: <Home className="min-w-4 h-4" />,
    label: "Home",
    href: "/admin/home"
  },
  {
    icon: <Calendar className="min-w-4 h-4" />,
    label: "Calendario",
    href: "/admin/calendar"
  },
  {
    icon: <CheckCircle className="min-w-4 h-4" />,
    label: "Conferma prenotazioni",
    href: "/admin/confirm"
  },
  {
    icon: <Phone className="min-w-4 h-4" />,
    label: "Fonici",
    href: "/admin/engineers"
  },
  {
    icon: <Sun className="min-w-4 h-4" />,
    label: "Ferie e permessi",
    href: "/admin/holidays"
  },
  {
    icon: <Settings className="min-w-4 h-4" />,
    label: "Impostazioni",
    href: "/admin/settings"
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div 
        className={cn(
          "h-screen fixed left-0 top-0 z-40 bg-white border-r transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-start justify-between mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1">
            <Image src={logo} width={30} alt="Cashmere logo" className='mb-8'/>
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 py-4 rounded-lg mb-1 hover:bg-gray-100 transition-colors",
                  "text-gray-700 hover:text-black",
                  isCollapsed ? 'flex-col' : ''
                )}
              >
                {item.icon}
                {!isCollapsed && <span className='text-sm font-light'>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {!isCollapsed && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@cashmere.com</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {children}
      </div>
    </div>
  )
}
