import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Facebook, Twitter, Instagram, Github } from 'lucide-react'

export default function Footer() {
  return (
    <Card className="w-full mt-8">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Infinite Fusion</h3>
          <p className="text-sm text-muted-foreground">
            Explore endless Pokémon combinations and discover new fusion possibilities.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/fusion" className="text-sm hover:underline">Fusion Calculator</Link></li>
            <li><Link href="/find" className="text-sm hover:underline">Fusion Finder</Link></li>
            <li><Link href="/dex" className="text-sm hover:underline">Fusion Dex</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Pages</h3>
          <ul className="space-y-2">
            <li><Link href="/disclaimer" className="text-sm hover:underline">Disclaimer</Link></li>
            <li><Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
            <li><Link href="/contact" className="text-sm hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row justify-between items-center border-t p-6">
        <div className="text-sm text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} Infinite Fusion. All rights reserved.
          <br />
          Pokémon and Pokémon character names are trademarks of Nintendo.
        </div>
        <div className="flex space-x-4">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Instagram size={20} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}