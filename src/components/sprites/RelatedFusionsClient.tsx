"use client";

import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { LoadAllFusionsResponse } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { GridContent, PokemonCard } from "../pages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from '../ui/separator';
import { gridClass } from '@/lib/utils/constants';

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

  const memoizedFilters = useMemo(() => (
    <div className="flex gap-2 md:gap-4" onClick={(e) => e.stopPropagation()}>
      <Select onValueChange={handleSpriteFilterChange} value={spriteFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sprite Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sprites</SelectItem>
          <SelectItem value="fusion">Custom Sprites</SelectItem>
          <SelectItem value="autogen">Autogen Sprites</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleFusionTypeFilterChange} value={fusionTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Fusion Part" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_fusions">All Fusions</SelectItem>
          <SelectItem value="head">Head Only</SelectItem>
          <SelectItem value="body">Body Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ), [handleSpriteFilterChange, handleFusionTypeFilterChange, spriteFilter, fusionTypeFilter]);

  return (
    <Card className="py-4">
      <CardContent className="flex justify-between flex-wrap">
        <div className="my-auto">
          <h2 className="text-xl mb-2 text-center">Related Fusions ({allFilteredData.length})</h2>
        </div>
        {memoizedFilters}
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