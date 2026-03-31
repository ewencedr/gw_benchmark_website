'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface HeroVideoProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}

export function HeroVideo({
  title,
  subtitle,
  children,
  compact = false,
}: HeroVideoProps) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${compact ? 'min-h-[40vh]' : 'min-h-[85vh]'}`}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/gw-loop.webm" type="video/webm" />
        <source src="/videos/gw-loop.mp4" type="video/mp4" />
      </video>

      <div className="from-background/70 via-background/50 to-background absolute inset-0 bg-gradient-to-b" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1
            className={`font-bold tracking-tight ${compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl lg:text-7xl'}`}
          >
            {title}
          </h1>
        </motion.div>

        {subtitle && (
          <motion.p
            className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
