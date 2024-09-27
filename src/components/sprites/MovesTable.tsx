import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Assuming you're using this table component
import Image from "next/image";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import React from "react";

// MovesTable component
interface MovesTableProps {
    all_moves: {
        id: string;
        real_name: string;
        function_code: string;
        base_damage: number;
        type: string;
        category: number;
        accuracy: number;
        total_pp: number;
        effect_chance: number;
        target: string;
        priority: number;
        flags: string;
        real_description: string;
        level: number;
    }[];
}

// MovesTable functional component
const MovesTable: React.FC<MovesTableProps> = ({ all_moves }) => {
    return (
        <Card className="border border-gray-200 dark:border-gray-700  my-4">
            <h2 className="my-2 text-lg text-muted-foreground text-center">Moves</h2>
            <Separator />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Move</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Category</TableHead>
                        <TableHead className="text-center">Base Damage</TableHead>
                        <TableHead className="text-center">Accuracy</TableHead>
                        <TableHead className="text-center">PP</TableHead>
                        <TableHead colSpan={4} className="min-w-64 lg:min-w-80 text-center">Effect</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {all_moves.map((move, index) => (
                        <React.Fragment key={index}>
                            <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                {/* Move Name */}
                                <TableCell className="text-center p-2 lg:p-4">{move.real_name}</TableCell>

                                {/* Type with Badge */}
                                <TableCell className="text-center p-0 lg:m-2">
                                    <Image
                                        src={`/images/type/${move.type.toLowerCase()}.png`}
                                        className="w-16 lg:min-w-0 my-auto rounded-sm"
                                        alt={move.type}
                                        width={96}
                                        height={32} />
                                </TableCell>

                                {/* Category (Physical, Special, or Status) */}
                                <TableCell className="text-center p-2 lg:p-4">
                                    {move.category === 0 ? "Physical" : move.category === 1 ? "Special" : "Status"}
                                </TableCell>

                                {/* Base Damage */}
                                <TableCell className="text-center p-2 lg:p-4">{move.base_damage || "-"}</TableCell>

                                {/* Accuracy */}
                                <TableCell className="text-center p-2 lg:p-4">{move.accuracy || "-"}</TableCell>

                                {/* PP (Power Points) */}
                                <TableCell className="text-center p-2 lg:p-4">{move.total_pp}</TableCell>

                                {/* Effect Description */}
                                <TableCell colSpan={4} className="text-center p-2 lg:p-4">{move.real_description}</TableCell>
                            </TableRow>

                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export { MovesTable };
