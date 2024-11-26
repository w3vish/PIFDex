import SpritePage from "@/app/[spriteId]/page";

export default async function NotFoundPage() {
  // Wrap params and searchParams in a Promise
  const params = Promise.resolve({ spriteId: '404' });
  const searchParams = Promise.resolve({});

  // Return the SpritePage with Promise-based params and searchParams
  return SpritePage({ 
    params, 
    searchParams 
  });
}