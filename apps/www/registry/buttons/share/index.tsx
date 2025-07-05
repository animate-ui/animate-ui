'use client';
import * as React from 'react';
import { Share2, Github, X, Facebook } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';
import { HTMLMotionProps, motion, AnimatePresence } from 'motion/react';

const buttonVariants = cva(
  "relative overflow-hidden cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        default: 'min-w-28 h-10 px-4 py-2',
        sm: 'min-w-24 h-9 rounded-md gap-1.5 px-3',
        lg: 'min-w-32 h-11 px-8',
      },
      icon: {
        suffix: 'pl-4',
        prefix: 'pr-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 28,
  default: 16,
};

type ShareButtonProps = HTMLMotionProps<'button'> & {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  icon?: 'suffix' | 'prefix';
  onIconClick?: (platform: 'github' | 'x' | 'facebook') => void;
} & VariantProps<typeof buttonVariants>;

function ShareButton({
  children,
  className,
  variant,
  size = 'default',
  icon,
  onIconClick,
  ...props
}: ShareButtonProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size, className, icon }))}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <AnimatePresence initial={false} mode="wait">
        {!hovered ? (
          <motion.div
            key="content"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            className=" absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center gap-2"
          >
            {icon === 'prefix' && (
              <Share2 className="size-4" size={iconSizeMap[size]} />
            )}
            {children}
            {icon === 'suffix' && (
              <Share2 className="size-4" size={iconSizeMap[size]} />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="icons"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
            className=" absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center gap-2"
          >
            <ShareIconGroup size={size} onIconClick={onIconClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

const shareIconGroupVariants = cva('flex items-center justify-center gap-3', {
  variants: {
    size: {
      sm: 'text-[16px]',
      md: 'text-[20px]',
      lg: 'text-[28px]',
      default: 'text-[16px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type ShareIconGroupProps = HTMLMotionProps<'div'> & {
  size?: 'sm' | 'md' | 'lg' | 'default';
  className?: string;
  onIconClick?: (
    platform: 'github' | 'x' | 'facebook',
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
} & VariantProps<typeof shareIconGroupVariants>;

function ShareIconGroup({
  size = 'default',
  className,
  onIconClick,
}: ShareIconGroupProps) {
  const iconSize = iconSizeMap[size];

  const handleIconClick = React.useCallback(
    (
      platform: 'github' | 'x' | 'facebook',
      event: React.MouseEvent<HTMLDivElement>,
    ) => {
      onIconClick?.(platform, event);
    },
    [onIconClick],
  );

  return (
    <motion.div
      className={cn(shareIconGroupVariants({ size }), 'group', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.5, type: 'spring', bounce: 0.4 }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        className="group-hover:opacity-100 cursor-pointer py-3 rounded-lg box-border"
        onClick={(event) => handleIconClick('github', event)}
      >
        <Github size={iconSize} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, type: 'spring', bounce: 0.4 }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        className="group-hover:opacity-100 cursor-pointer py-3 rounded-lg box-border"
        onClick={(event) => handleIconClick('x', event)}
      >
        <X size={iconSize} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring', bounce: 0.4 }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        className="group-hover:opacity-100 cursor-pointer py-3 rounded-lg box-border"
        onClick={(event) => handleIconClick('facebook', event)}
      >
        <Facebook size={iconSize} />
      </motion.div>
    </motion.div>
  );
}

export { ShareButton, type ShareButtonProps, ShareIconGroup };
