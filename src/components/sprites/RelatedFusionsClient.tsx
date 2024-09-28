"use client";

import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { LoadAllFusionsResponse } from "@/lib/types";
import { Card, CardContent } from "../ui/card";
import { Separator } from '../ui/separator';
import { GridContent, PokemonCard } from "../pages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ITEMS_PER_CHUNK = 50;

// Custom debounce hook
function useDebounce(func: Function, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  }, [func, delay]);
}

// CustomSelectContent component to prevent touch and click events
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
        // Prevent touch and click events to stop interactions with content behind the dropdown
        divRef.ontouchstart = (e) => e.preventDefault();
        divRef.onclick = (e) => e.stopPropagation();
      }}
    >
      {props.children}
    </div>
  </SelectContent>
));

CustomSelectContent.displayName = 'CustomSelectContent';

const RelatedFusionsClient = React.memo(({
  pokemons,
  id: baseId,
}: {
  pokemons: LoadAllFusionsResponse;
  id: string;
}) => {
  const [spriteFilter, setSpriteFilter] = useState("all");
  const [fusionTypeFilter, setFusionTypeFilter] = useState("all_fusions");
  const [visibleData, setVisibleData] = useState<any[]>([]);
  const [allFilteredData, setAllFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filterData = useCallback((spriteFilter: string, fusionTypeFilter: string) => {
    let filteredResult = pokemons.data;

    switch (spriteFilter) {
      case "fusion":
        filteredResult = filteredResult.filter((pokemon) => pokemon.total_sprites !== 0);
        break;
      case "autogen":
        filteredResult = filteredResult.filter((pokemon) => pokemon.total_sprites === 0);
        break;
    }

    switch (fusionTypeFilter) {
      case "head":
        filteredResult = filteredResult.filter((pokemon) =>
          pokemon.id.startsWith(`${baseId}.`)
        );
        break;
      case "body":
        filteredResult = filteredResult.filter((pokemon) =>
          pokemon.id.endsWith(`.${baseId}`)
        );
        break;
    }

    setAllFilteredData(filteredResult);
    setVisibleData(filteredResult.slice(0, ITEMS_PER_CHUNK));
    setHasMore(filteredResult.length > ITEMS_PER_CHUNK);
  }, [pokemons.data, baseId]);

  const debouncedFilter = useDebounce(filterData, 300);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setVisibleData(prevData => {
      const currentLength = prevData.length;
      const nextData = allFilteredData.slice(0, currentLength + ITEMS_PER_CHUNK);
      setHasMore(nextData.length < allFilteredData.length);
      setIsLoading(false);
      return nextData;
    });
  }, [isLoading, hasMore, allFilteredData]);

  const handleSpriteFilterChange = useCallback(
    (value: string) => {
      setSpriteFilter(value);
      debouncedFilter(value, fusionTypeFilter);
    },
    [debouncedFilter, fusionTypeFilter]
  );

  const handleFusionTypeFilterChange = useCallback(
    (value: string) => {
      setFusionTypeFilter(value);
      debouncedFilter(spriteFilter, value);
    },
    [debouncedFilter, spriteFilter]
  );

  useEffect(() => {
    debouncedFilter(spriteFilter, fusionTypeFilter);
  }, [debouncedFilter, spriteFilter, fusionTypeFilter]);

  const memoizedPokemonCards = useMemo(() =>
    visibleData.map((pokemon) => (
      <PokemonCard pokemon={pokemon} key={pokemon.id} />
    )),
    [visibleData]
  );

  // Memoized filters, ensuring the selects stay in the same row on mobile devices
  const memoizedFilters = useMemo(() => (
    <div className="flex flex-row gap-2 md:gap-4" onClick={(e) => e.stopPropagation()}>
      <Select onValueChange={handleSpriteFilterChange} value={spriteFilter}>
        <SelectTrigger className="min-w-max w-[150px] md:w-[180px]">
          <SelectValue placeholder="Sprite Type" />
        </SelectTrigger>
        <CustomSelectContent>
          <SelectItem value="all">All Sprites</SelectItem>
          <SelectItem value="fusion">Custom Sprites</SelectItem>
          <SelectItem value="autogen">Autogen Sprites</SelectItem>
        </CustomSelectContent>
      </Select>

      <Select onValueChange={handleFusionTypeFilterChange} value={fusionTypeFilter}>
        <SelectTrigger className="min-w-max w-[150px] md:w-[180px]">
          <SelectValue placeholder="Fusion Part" />
        </SelectTrigger>
        <CustomSelectContent>
          <SelectItem value="all_fusions">All Fusions</SelectItem>
          <SelectItem value="head">Head Only</SelectItem>
          <SelectItem value="body">Body Only</SelectItem>
        </CustomSelectContent>
      </Select>
    </div>
  ), [handleSpriteFilterChange, handleFusionTypeFilterChange, spriteFilter, fusionTypeFilter]);

  return (
    <Card className="py-4">
      <CardContent className="flex justify-between flex-wrap gap-4">
        <div className="my-auto mx-auto md:mx-0">
          <h2 className="text-xl text-center">Related Fusions ({allFilteredData.length})</h2>
        </div>
        <div className='flex justify-center w-full md:w-auto'>
          {memoizedFilters}
        </div>
      </CardContent>

      <Separator className='mb-4'/>

      <GridContent>
        {memoizedPokemonCards}
      </GridContent>
      
      {hasMore && (
        <div className="mt-4 text-center">
          <Button onClick={loadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </Card>
  );
});

RelatedFusionsClient.displayName = 'RelatedFusionsClient';

export { RelatedFusionsClient };
