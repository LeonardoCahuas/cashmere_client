import { CarFront } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './NavigationMenu'

export const DropDownMenu = () => {
  const tabs = [
    {
      title: 'Ricerca',
      options: [
        { label: 'Noleggia auto a lungo termine', href: '' },
        { label: 'Noleggia auto a breve termine', href: '' },
        { label: 'Noleggia moto a lungo termine', href: '' },
        { label: 'Noleggia moto a breve termine', href: '' },
        { label: 'Noleggia furgoni a lungo termine', href: '' },
        { label: 'Noleggia furgoni a breve termine', href: '' },
      ],
    },
    {
      title: 'Noleggia',
      options: [
        { label: 'Inserisci auto a noleggio', href: '' },
        { label: 'Inserisci moto a noleggio', href: '' },
      ],
    },
    {
      title: 'Auto più noleggiate',
      options: [
        { label: 'Veicoli certificati', href: '' },
        { label: 'Luxury breve termine', href: '' },
        { label: 'Veicoli con conducente', href: '' },
        { label: 'Marchi più richiesti', href: '' },
      ],
    },
  ]

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {tabs.map(({ title, options }) => (
          <NavigationMenuItem key={title} className="text-siva-main-text">
            <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-96 p-2 flex flex-col gap-0 text-siva-main-text text-sm font-medium">
              {options.map(({ label }) => (
                <NavigationMenuLink
                  key={label}
                  className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:text-black hover:bg-neutral-100"
                >
                  <div className="w-8 h-8 bg-neutral-50 rounded-md flex justify-center items-center">
                    <CarFront width={16} height={16} className="stroke-neutral-700" />
                  </div>
                  <p>{label}</p>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
