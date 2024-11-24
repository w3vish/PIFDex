"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from '@/lib/theme/utils'
import { BookOpen, Calculator, Heart, Info, Layers, Mail, Menu, Palette, Search, ShieldCheck, FileText, User, Zap, Download } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from '../theme'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import SearchBox from './SearchBox'

interface LinkType {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Header() {
  const currentRoute = usePathname();
  const [isSearchOpen, setSearchOpen] = useState(false);

  const navLinks: LinkType[] = [
    { name: 'Fusion Calculator', href: '/fusion', icon: Calculator },
    { name: 'Fusion Dex', href: '/dex', icon: BookOpen },
    { name: 'Download', href: '/download', icon: Download },
    { name: 'Artists', href: '/artists', icon: Palette },
    // { name: 'Triple Fusions', href: '/triple-fusions', icon: Layers },
    // { name: 'Self Fusions', href: '/self-fusions', icon: Zap },
  ];

  const mobileLinks = {
    mainLinks: [
      { name: 'Fusion Calculator', href: '/fusion', icon: Calculator },
      { name: 'Fusion Dex', href: '/dex', icon: BookOpen },
      { name: 'Download Game', href: '/download', icon: Download },
      { name: 'Artists', href: '/artists', icon: Palette }],
    mainPages: [
      { name: 'Favorites', href: '/favorites', icon: Heart },
      { name: 'Triple Fusions', href: '/triple-fusions', icon: Layers },
      { name: 'Self Fusions', href: '/self-fusions', icon: Zap },
    ],
    sitePages: [
      { name: 'About Us', href: '/about', icon: Info },
      { name: 'Contact Us', href: '/contact', icon: Mail },
      { name: 'Privacy Policy', href: '/privacy', icon: ShieldCheck },
      { name: 'Terms of Service', href: '/terms', icon: FileText },
      { name: 'Disclaimer', href: '/disclaimer', icon: FileText },
    ]
  };

  const userMenuItems: LinkType[] = [
    { name: 'Favorites', href: '/favorites', icon: Heart },
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link prefetch={false} href="/" className="text-lg font-semibold">
            Infinite Fusion
          </Link>

          <div className="flex gap-16">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map(link => (
                <Link
                  prefetch={false}
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm px-3 py-2 hover:underline transition-all",
                    currentRoute === link.href ? "border-b-2 border-gray-500 font-bold" : ""
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* User Menu and Mobile Navigation */}
            <div className="flex items-center space-x-2">
              {/* Desktop Search Input */}
              <div className="relative w-56 hidden lg:block">
                <Input
                  className="pr-16"
                  placeholder="Search..."
                  onFocus={() => setSearchOpen(true)}
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>S
                  </kbd>
                </div>
              </div>

              {/* Mobile Search Icon */}
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Open search</span>
              </Button>

              {/* User Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="hidden lg:flex">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {userMenuItems.map(item => (
                    <Link prefetch={false} href={item.href} key={item.name}>
                      <DropdownMenuItem className="cursor-pointer">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </DropdownMenuItem>
                    </Link>
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
                      <SheetClose />
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex-grow overflow-y-auto py-2">
                      {mobileLinks.mainLinks.map(link => renderLinks(link, currentRoute))}
                      <Separator />
                      {mobileLinks.mainPages.map(link => renderLinks(link, currentRoute))}
                      <Separator />
                      {mobileLinks.sitePages.map(link => renderLinks(link, currentRoute))}
                    </div>
                  </div>
                </SheetContent>

                <ThemeToggle />
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Search Box Component */}
      <SearchBox open={isSearchOpen} setOpen={setSearchOpen} />
    </nav>
  )
}

const renderLinks = (link: LinkType, currentRoute: string) => (
  <SheetClose asChild key={link.name}>
    <Link
      prefetch={false}
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
);
