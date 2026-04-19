import { Fragment } from 'react';

import type { InlineSegment } from '@/content/site-copy';

type InlineRichTextProps = {
  segments: readonly InlineSegment[];
  externalLinkClassName: string;
};

/**
 * Renders copy authored as alternating strings and inline link objects (see site-copy.ts).
 */
export function InlineRichText({
  segments,
  externalLinkClassName,
}: InlineRichTextProps) {
  return (
    <>
      {segments.map((seg, i) =>
        typeof seg === 'string' ? (
          <Fragment key={i}>{seg}</Fragment>
        ) : (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkClassName}
          >
            {seg.label}
          </a>
        )
      )}
    </>
  );
}
