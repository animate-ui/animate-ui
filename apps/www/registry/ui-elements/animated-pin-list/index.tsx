'use client';

import * as React from 'react';
import {
  GitCommit,
  AlertTriangle,
  Box,
  KeyRound,
  Regex,
  Pin,
} from 'lucide-react';
import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { cn } from '@workspace/ui/lib/utils';

const ITEMS = [
  {
    id: 1,
    name: 'Commit Zone',
    info: 'Code updates · Closes 9:00 PM',
    icon: GitCommit,
    pinned: true,
  },
  {
    id: 2,
    name: '404 Room',
    info: 'Fixing errors · Open 24 hours',
    icon: AlertTriangle,
    pinned: true,
  },
  {
    id: 3,
    name: 'NPM Stop',
    info: 'Install stuff · Closes 8:00 PM',
    icon: Box,
    pinned: false,
  },
  {
    id: 4,
    name: 'Token Lock',
    info: 'Login stuff · Open 24 hours',
    icon: KeyRound,
    pinned: false,
  },
  {
    id: 5,
    name: 'Regex Zone',
    info: 'Find words · Closes 9:00 PM',
    icon: Regex,
    pinned: false,
  },
];

const ITEM_MOTION_TRANSITION = {
  type: 'spring',
  stiffness: 320,
  damping: 20,
  mass: 0.8,
};

const LABEL_MOTION_PROPS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.22, ease: 'easeInOut' },
};

function AnimatedPinList() {
  const [items, setItems] = React.useState(ITEMS);
  const [togglingGroup, setTogglingGroup] = React.useState<
    'pinned' | 'unpinned' | null
  >(null);

  const pinned = items.filter((u) => u.pinned);
  const unpinned = items.filter((u) => !u.pinned);

  const toggleStatus = (id: number) => {
    const item = items.find((u) => u.id === id);
    if (!item) return;

    setTogglingGroup(item.pinned ? 'pinned' : 'unpinned');
    setItems((prev) => {
      const idx = prev.findIndex((u) => u.id === id);
      if (idx === -1) return prev;
      const updated = [...prev];
      const [item] = updated.splice(idx, 1);
      if (!item) return prev;
      const toggled = { ...item, pinned: !item.pinned };
      toggled.pinned ? updated.push(toggled) : updated.unshift(toggled);
      return updated;
    });
    // Reset group z-index after the animation duration (keep in sync with animation timing)
    setTimeout(() => setTogglingGroup(null), 500);
  };

  return (
    <div className="space-y-10">
      <LayoutGroup>
        <div className="space-y-2">
          <AnimatePresence>
            {pinned.length > 0 && (
              <motion.p
                layout
                key="pinned-label"
                className="font-medium px-3 text-neutral-500 dark:text-neutral-300 text-sm"
                {...LABEL_MOTION_PROPS}
              >
                Pinned Items
              </motion.p>
            )}
          </AnimatePresence>
          {pinned.length > 0 && (
            <div
              className={cn(
                'space-y-3 relative',
                togglingGroup === 'pinned' ? 'z-10' : 'z-5',
              )}
            >
              {pinned.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`item-${item.id}`}
                  onClick={() => toggleStatus(item.id)}
                  transition={ITEM_MOTION_TRANSITION}
                  className="flex items-center justify-between gap-5 rounded-2xl bg-neutral-200 dark:bg-neutral-800 p-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-background p-2">
                      <item.icon className="size-5 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        {item.info}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center size-8 rounded-full bg-neutral-400 dark:bg-neutral-600">
                    <Pin className="size-4 text-white fill-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {unpinned.length > 0 && (
              <motion.p
                layout
                key="all-label"
                className="font-medium px-3 text-neutral-500 dark:text-neutral-300 text-sm"
                {...LABEL_MOTION_PROPS}
              >
                All Items
              </motion.p>
            )}
          </AnimatePresence>
          {unpinned.length > 0 && (
            <div
              className={cn(
                'space-y-3 relative',
                togglingGroup === 'unpinned' ? 'z-10' : 'z-5',
              )}
            >
              {unpinned.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`item-${item.id}`}
                  onClick={() => toggleStatus(item.id)}
                  transition={ITEM_MOTION_TRANSITION}
                  className="flex items-center justify-between gap-5 rounded-2xl bg-neutral-200 dark:bg-neutral-800 p-2 group"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-background p-2">
                      <item.icon className="size-5 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        {item.info}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center size-8 rounded-full bg-neutral-400 dark:bg-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                    <Pin className="size-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </LayoutGroup>
    </div>
  );
}

export { AnimatedPinList };
