"use client";

import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { PokemonCardData } from '@/lib/types/SpriteResponse';
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

const CustomSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectContent>,
  React.ComponentPropsWithoutRef<typeof SelectContent>
>((props, ref) => (
  <SelectContent {...props} ref={ref}>
    <div ref={(divRef) => {
      if (!divRef) return;
      divRef.ontouchstart = (e) => e.preventDefault();
      divRef.onclick = (e) => e.stopPropagation();
    }}>
      {props.children}
    </div>
  </SelectContent>
));

CustomSelectContent.displayName = 'CustomSelectContent';

// Debounce function
const useDebounce = (func: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => func(...args), delay);
  }, [func, delay]);
};

const RelatedFusionsClient = ({
  pokemons,
  id: baseId,
}: {
  pokemons: PokemonCardData[];
  id: string;
}) => {
  const [spriteFilter, setSpriteFilter] = useState("all");
  const [fusionTypeFilter, setFusionTypeFilter] = useState("all_fusions");
  const [visibleData, setVisibleData] = useState<PokemonCardData[]>([]);
  const [allFilteredData, setAllFilteredData] = useState<PokemonCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filterData = useCallback((spriteFilter: string, fusionTypeFilter: string) => {
    let filteredResult = pokemons;

    // Apply sprite type filter with default value for total_sprites
    if (spriteFilter === "fusion") {
        filteredResult = filteredResult.filter(pokemon => pokemon.spriteType === "fusion" && (pokemon.total_sprites ?? 0) > 0);
    } else if (spriteFilter === "autogen") {
        filteredResult = filteredResult.filter(pokemon => pokemon.spriteType === "autogen" && (pokemon.total_sprites ?? 0) === 0);
    }

    // Apply fusion type filter based on head or body patterns
    if (fusionTypeFilter === "head") {
        filteredResult = filteredResult.filter(pokemon => pokemon.id.startsWith(`${baseId}.`));
    } else if (fusionTypeFilter === "body") {
        filteredResult = filteredResult.filter(pokemon => pokemon.id.endsWith(`.${baseId}`));
    }

    // Update data state
    setAllFilteredData(filteredResult);
    setVisibleData(filteredResult.slice(0, ITEMS_PER_CHUNK));
    setHasMore(filteredResult.length > ITEMS_PER_CHUNK);
}, [pokemons, baseId]);


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

  const handleSpriteFilterChange = useCallback((value: string) => {
    setSpriteFilter(value);
    debouncedFilter(value, fusionTypeFilter);
  }, [debouncedFilter, fusionTypeFilter]);

  const handleFusionTypeFilterChange = useCallback((value: string) => {
    setFusionTypeFilter(value);
    debouncedFilter(spriteFilter, value);
  }, [debouncedFilter, spriteFilter]);

  useEffect(() => {
    debouncedFilter(spriteFilter, fusionTypeFilter);
  }, [debouncedFilter, spriteFilter, fusionTypeFilter]);

  const memoizedPokemonCards = useMemo(() => visibleData.map(pokemon => (
    <PokemonCard pokemon={pokemon} key={pokemon.id} />
  )), [visibleData]);

  const memoizedFilters = useMemo(() => (
    <div className="flex flex-row gap-2 md:gap-4">
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
        <div className="flex justify-center w-full md:w-auto">
          {memoizedFilters}
        </div>
      </CardContent>

      <Separator className="mb-4" />

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
};

RelatedFusionsClient.displayName = 'RelatedFusionsClient';
export { RelatedFusionsClient };
