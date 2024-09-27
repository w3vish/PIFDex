"use client"

import Link from 'next/link'
import { Menu, X, User, Heart, Settings, Download, BookOpen, Calculator, Wand2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { Separator } from '../ui/separator'
import { ThemeToggle } from '../theme'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/theme/utils'

export default function Header() {
  const currentRoute = usePathname() // Get the current path

  // Define active link styles as a constant
  const activeLinkStyle = "border-b-2 ";

  const navLinks = [
    { name: 'Fusion Calculator', href: '/name-fusion', icon: Calculator },
    { name: 'Fusion Finder', href: '/find', icon: Wand2 },
    { name: 'Download', href: '/download', icon: Download },
    { name: 'Game Wiki', href: '/wiki', icon: BookOpen },
  ]

  const userMenuItems = [
    { name: 'Liked Sprites', icon: Heart },
    { name: 'Settings', icon: Settings },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-lg font-semibold">
            Infinite Fusion
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm px-3 py-2 hover:underline transition-all",  // General link styles
                  currentRoute === link.href ? activeLinkStyle : ""    // Apply active link style if current route matches
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Menu and Mobile Navigation */}
          <div className="flex items-center space-x-2">
            {/* Dropdown Menu for User */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.name}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu (Sheet) */}
            <Sheet>
              <SheetContent side="right" className="w-full sm:w-80 p-0">
                <SheetTitle className="sr-only">Open Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <span className="text-lg font-semibold">Infinite Fusion</span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-grow overflow-y-auto py-2">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center px-4 py-3 text-sm hover:bg-accent transition-all",
                            currentRoute === link.href ? "bg-accent" : ""
                          )}
                        >
                          <link.icon className="mr-3 h-5 w-5" />
                          {link.name}
                        </Link>
                      </SheetClose>
                    ))}
                    <Separator />
                    {userMenuItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Button variant="ghost" className="w-full justify-start px-4 py-3 text-sm">
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </Button>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </SheetContent>
              <ThemeToggle />
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
