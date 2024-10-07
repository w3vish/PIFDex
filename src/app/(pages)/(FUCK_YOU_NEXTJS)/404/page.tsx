// app/404/page.tsx
import SpritePage from "@/app/[spriteId]/page";


export default function NotFoundPage() {
 
  return SpritePage({
    params: { spriteId: '404' },
    searchParams: {},
  });
}
