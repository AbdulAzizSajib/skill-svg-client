import type { ISvg } from '@/types/svg.types';

import { SvgCard } from './SvgCard';

export function SvgGrid({ items, fetching }: { items: ISvg[]; fetching?: boolean }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-10 text-center">
        <p className="text-sm text-muted-foreground">No SVGs match your filters.</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap gap-4 justify-center items-center sm:justify-start "
      data-fetching={fetching ? 'true' : undefined}
    >
      {items.map((svg) => (
        <SvgCard key={svg.id} svg={svg} />
      ))}
    </div>
  );
}
