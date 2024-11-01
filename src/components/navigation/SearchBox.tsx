"use client"
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from "@/components/ui/command"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { 
  File, 
  Heart, 
  Laptop, 
  Layers, 
  Moon, 
  Sun, 
  Zap, 
  Calculator, 
  BookOpen, 
  Palette, 
  Info, 
  Mail, 
  ShieldCheck, 
  FileText, 
  Download
} from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import * as React from "react"

interface SearchBoxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface LinkItem {
  href: string;
  icon: React.ElementType;
  name: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ open, setOpen }) => {
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  // Merged links from the provided arrays
  const links: LinkItem[] = [
    { name: 'Fusion Calculator', href: '/fusion', icon: Calculator },
    { name: 'Fusion Dex', href: '/dex', icon: BookOpen },
    { name: 'Download Game', href: '/download', icon: Download },
    { name: 'Artists', href: '/artists', icon: Palette },
    { name: "Triple Fusions", href: "/triple-fusions", icon: Layers },
    { name: "Self Fusions", href: "/self-fusions", icon: Zap },
    { name: "Favorites", href: "/favorites", icon: Heart },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Contact Us", href: "/contact", icon: Mail },
    { name: 'Privacy Policy', href: '/privacy', icon: ShieldCheck },
    { name: 'Terms of Service', href: '/terms', icon: FileText },
    { name: 'Disclaimer', href: '/disclaimer', icon: FileText },
  ]

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const handleSelect = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  const IconComponent = ({ icon: Icon }: { icon: React.ElementType }) => {
    return <Icon className="mr-2 h-4 w-4" />
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <DialogDescription className="sr-only">
        Search for commands or navigate through the application
      </DialogDescription>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Links">
          {links.map((item) => (
            <CommandItem 
              key={item.href} 
              onSelect={() => handleSelect(item.href)} 
              className="cursor-pointer"
            >
              <IconComponent icon={item.icon || File} />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem 
            onSelect={() => setTheme("light")} 
            className={`cursor-pointer ${theme === "light" ? "bg-accent" : ""}`}
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => setTheme("dark")} 
            className={`cursor-pointer ${theme === "dark" ? "bg-accent" : ""}`}
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => setTheme("system")} 
            className={`cursor-pointer ${theme === "system" ? "bg-accent" : ""}`}
          >
            <Laptop className="mr-2 h-4 w-4" />
            <span>System</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default SearchBox
