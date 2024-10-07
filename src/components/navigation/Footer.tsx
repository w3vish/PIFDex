import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Calculator,
  Github,
  Heart,
  Layers,
  Palette,
  Zap,
  Twitter,
  Info,
  Mail,
  Search,
  DownloadCloud,
  ShieldCheck,
  FileText,
  Library,
  Home,
} from "lucide-react"

const footerLinks = [
  {
    title: "Quick Links",
    items: [
      { name: 'Home', href: '/', icon: Home },
      { name: 'Fusion Calculator', href: '/fusion', icon: Calculator },
      { name: 'Fusion Dex', href: '/dex', icon: BookOpen },
      { name: 'Artists', href: '/artists', icon: Palette },
    ]
  },
  {
    title: "Pages",
    items: [
      { name: "Favorites", href: "/favorites", icon: Heart },
      { name: "Triple Fusions", href: "/triple-fusions", icon: Layers },
      { name: "Self Fusions", href: "/self-fusions", icon: Zap },
      { name: "About Us", href: "/about", icon: Info },
    ]
  },
  // {
    //   title: "More",
    //   items: [
      //     { name: "Fusion Finder", href: "/find", icon: Search },
      //     { name: "Wiki", href: "/wiki", icon: Library },
      //     { name: "Download Game", href: "/download", icon: DownloadCloud },
      //   ]
      // },
      {
        title: "Legal",
        items: [
      { name: "Contact Us", href: "/contact", icon: Mail },
      { name: 'Privacy Policy', href: '/privacy', icon: ShieldCheck },
      { name: 'Terms of Service', href: '/terms', icon: FileText },
      // { name: 'Cookie Policy', href: '/cookies', icon: FileText },
      { name: 'Disclaimer', href: '/disclaimer', icon: FileText },
    ]
  },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/', icon: Github },
  { name: 'Twitter', href: 'https://twitter.com/', icon: Twitter },
]

export default function Footer() {
  return (
    <footer className="bg-card mt-8 py-12 px-4 md:px-6 border-t-2">
      <div className="container mx-auto max-w-6xl">
        {/* Footer Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {footerLinks.map((section) => (
            <div key={section.title} className="max-w-fit">
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link prefetch={false} href={item.href} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      <span className="md:inline">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />
        
        {/* Footer Disclaimer and Social Links */}
        <div className="space-y-4 text-sm text-muted-foreground">
          <p className="">
            InfiniteFusion.org is a fan-made website and is not affiliated with, endorsed, sponsored, 
            or specifically approved by Game Developers, Nintendo, Game Freak, or The Pokémon Company. 
            All Pokémon images, names, and related media are intellectual property of their respective owners.
          </p>
          <p className="">
            Pokémon Infinite Fusion is a fan-made game. This website serves as a resource 
            for the game&apos;s community and artists.
          </p>
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <p className="text-xs">
              © {new Date().getFullYear()} InfiniteFusion.org. All rights reserved.
            </p>
            {/* <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
