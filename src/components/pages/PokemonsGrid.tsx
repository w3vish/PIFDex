// components/GridContent.tsx
import React from "react";
import { CardContent } from "@/components/ui/card"; // Adjust the path based on your project structure
import { cn } from "@/lib/theme/utils";

// Define the props for the GridContent component
interface GridContentProps {
  children: React.ReactNode; // Expect children elements
  className?: string; // Optional additional classNames
}

// Define the grid classes once
const defaultGridClass = "p-0 px-2 gap-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";

const GridContent: React.FC<GridContentProps> = ({ children, className = "" }) => {
  return (
    <div className="mx-auto">
      <CardContent className={cn(`${defaultGridClass} ${className}`)}>
      {children}
    </CardContent>
    </div>
  );
};

export default GridContent;
