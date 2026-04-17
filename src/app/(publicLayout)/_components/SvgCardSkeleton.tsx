import { Card } from "@/components/ui/card";

export function SvgCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/70 p-4">
      <div className="flex flex-col gap-4 animate-pulse">
        
        {/* SVG Preview */}
        <div className="aspect-square rounded-lg bg-muted" />

        {/* Title */}
        <div className="h-4 w-3/4 rounded-md bg-muted" />

        {/* Subtitle / small text */}
        <div className="h-3 w-1/2 rounded-md bg-muted" />

      </div>
    </Card>
  );
}