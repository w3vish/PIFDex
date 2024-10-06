import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster";
import { Header, Footer } from "@/components/navigation";
import { GoogleAnalytics } from '@next/third-parties/google'
import "@/styles/globals.css";
import '@/styles/PokemonCard.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://infinitefusion.org'),
  title: {
    default: "Pokémon Infinite Fusion Dex & Tools",
    template: "%s | Pokémon Infinite Fusion"
  },
  description: "Explore the Pokémon Infinite Fusion Dex featuring 221,390 unique fusions and 170,000+ custom sprites. Access fusion calculator, game info, and community resources for Pokémon Infinite Fusion.",
  keywords: ["Pokémon Infinite Fusion", "Fusion Dex", "Custom Sprites", "Fusion Calculator", "Fan Game"],
  authors: [{ name: "InfiniteFusion.org Community" }],
  creator: "InfiniteFusion.org",
  verification: {
    
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${inter.className} max-w-screen-2xl flex flex-col mx-auto min-h-screen`}>
        <NextTopLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          <main className="max-w-screen-2xl">
            {children}
          </main>
          <Footer/>
          <Toaster />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-X91KPL7L5C" />
      </body>
    </html>
  );
}