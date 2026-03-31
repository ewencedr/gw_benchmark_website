'use client';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface LatexInlineProps {
  math: string;
}

interface LatexBlockProps {
  math: string;
}

export function Latex({ math }: LatexInlineProps) {
  return <InlineMath math={math} />;
}

export function LatexBlock({ math }: LatexBlockProps) {
  return (
    <div className="my-4 overflow-x-auto">
      <BlockMath math={math} />
    </div>
  );
}
