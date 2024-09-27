"use client"
import React, { useEffect } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '../ui/label';

// Custom SelectContent component with touch event prevention
const CustomSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectContent>,
  React.ComponentPropsWithoutRef<typeof SelectContent>
>((props, ref) => (
  <SelectContent
    {...props}
    ref={ref}
  >
    <div
      ref={(divRef) => {
        if (!divRef) return;
        divRef.ontouchstart = (e) => e.preventDefault();
      }}
    >
      {props.children}
    </div>
  </SelectContent>
));

CustomSelectContent.displayName = 'CustomSelectContent';

function SelectSpritesLimit() {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const currentLimit = searchParams?.get('limit') || '100';
  const [limit, setLimit] = React.useState(currentLimit);

  useEffect(() => {
    if (currentLimit !== limit) {
      setLimit(currentLimit);
    }
  }, [currentLimit, limit]);

  const handleLimitChange = (newLimit: string) => {
    setLimit(newLimit);
    Router.push(`?limit=${newLimit}`);
  }

  return (
    <div>
      <Label>Sprites Per Page</Label>
      <Select value={limit} onValueChange={handleLimitChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sprites Per Page" />
        </SelectTrigger>
        <CustomSelectContent>
          <SelectGroup>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </CustomSelectContent>
      </Select>
    </div>
  )
}

export default SelectSpritesLimit;