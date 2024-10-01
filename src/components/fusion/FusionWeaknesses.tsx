import React from 'react';
import { calculateTypeEffectiveness } from '@/lib/utils';
import { Card } from '../ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
import Image from 'next/image';

interface Types {
  headTypes: string[];
  bodyTypes: string[];
}

function FusionWeaknesses({ types }: { types: Types }) {
  // Calculate the weaknesses for both head and body
  const HeadWeaknesses = calculateTypeEffectiveness(types.headTypes, true);
  const BodyWeaknesses = calculateTypeEffectiveness(types.bodyTypes, true);

  return (
    <Card className="p-0">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow >
            {/* Head and Body columns share remaining width equally */}
            <TableHead colSpan={3} className="text-center w-[45%]">Weaknesses</TableHead>
           
          </TableRow>
          <TableRow>
            {/* Head and Body columns share remaining width equally */}
            <TableHead className="text-center w-[45%]">Head</TableHead>
            {/* Multiplier column takes the minimum width */}
            <TableHead className="text-center w-[10%] whitespace-nowrap">
              <span className="hidden sm:inline">Multiplier</span>
              <span className="inline sm:hidden">x</span>
            </TableHead>
            <TableHead className="text-center w-[45%]">Body</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(HeadWeaknesses).map((multiplier) => (
            <TableRow key={multiplier}>
              {/* Head Weaknesses */}
              <TableCell className="p-1 py-2 md:p-4 md:py-2">
                <div className="flex justify-center items-center flex-wrap gap-1">
                  {HeadWeaknesses[multiplier].map((type: string) => (
                    <Image
                      key={type}
                      src={`/images/type/${type.toLowerCase()}.png`}
                      className="w-14 lg:w-16 rounded-sm"
                      alt={type}
                      width={96}
                      height={32}
                    />
                  ))}
                </div>
              </TableCell>

              {/* Multiplier */}
              <TableCell className="p-1 py-2 md:p-4 md:py-2 text-center">
                {multiplier === '2' ? 'x2' :
                 multiplier === '1' ? 'x1' :
                 multiplier === '0.5' ? 'x0.5' :
                 multiplier === '0.25' ? 'x0.25' : multiplier}
              </TableCell>

              {/* Body Weaknesses */}
              <TableCell className="p-1 py-2 md:p-4 md:py-2">
                <div className="flex justify-center items-center flex-wrap gap-1">
                  {BodyWeaknesses[multiplier]?.map((type: string) => (
                    <Image
                      key={type}
                      src={`/images/type/${type.toLowerCase()}.png`}
                      className="w-14 lg:w-16 rounded-sm"
                      alt={type}
                      width={96}
                      height={32}
                    />
                  )) || <span className="text-muted-foreground">N/A</span>}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export { FusionWeaknesses };
