import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateTypeEffectiveness } from "@/lib/utils";
import { Card } from "../ui/card";
import Image from "next/image";

// WeaknessTable component
interface WeaknessTableProps {
  types: string[];
}

// Render the WeaknessTable based on the effectiveness of the selected types
const WeaknessTable: React.FC<WeaknessTableProps> = ({ types }) => {
  // Call the function to calculate effectiveness based on the provided types
  const effectiveness = calculateTypeEffectiveness(types);

  return (
    <Card className="border border-gray-200 dark:border-gray-700  my-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3} className="min-w-max text-center text-base text-muted-foreground">Weaknesses</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(effectiveness).map(([multiplier, types]) => (
            <TableRow key={multiplier} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <TableCell className="font-semibold py-2 lg:pl-10">
                {multiplier === "2" ? "x2" :
                  multiplier === "1" ? "x1" :
                    multiplier === "0.5" ? "x0.5" :
                      multiplier === "0.25" ? "x0.25" : multiplier}
              </TableCell>
              <TableCell className="w-max py-2">
                <div className="flex flex-wrap gap-1 lg:items-center lg:justify-center">
                  {types.map((type: string) => (
                    <Image
                      key={type}
                      src={`/images/type/${type.toLowerCase()}.png`}
                      className="w-14 lg:w-16 rounded-sm"
                      alt={type}
                      width={96}
                      height={32} />
                  ))}
                </div>
              </TableCell>
              <TableCell className="font-semibold py-2 hidden lg:block">
                {multiplier === "2" ? "x2" :
                  multiplier === "1" ? "x1" :
                    multiplier === "0.5" ? "x0.5" :
                      multiplier === "0.25" ? "x0.25" : multiplier}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>

  );
};

export { WeaknessTable };
