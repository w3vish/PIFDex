

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

   <article className="prose dark:prose-invert mx-auto space-y-4 my-14 px-4">
     {children}
   </article>
  );
}