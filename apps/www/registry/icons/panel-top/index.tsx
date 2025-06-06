'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/registry/icons/icon';

type PanelTopProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    rect: {},
    line: {
      initial: { x1: 3, y1: 9, x2: 21, y2: 9 },
      animate: {
        x1: 3,
        y1: 7,
        x2: 21,
        y2: 7,
        transition: { type: 'spring', damping: 20, stiffness: 200 },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: PanelTopProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.rect
        width={18}
        height={18}
        x={3}
        y={3}
        rx={2}
        ry={2}
        variants={variants.rect}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={3}
        y1={9}
        x2={21}
        y2={9}
        variants={variants.line}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function PanelTop(props: PanelTopProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  PanelTop,
  PanelTop as PanelTopIcon,
  type PanelTopProps,
  type PanelTopProps as PanelTopIconProps,
};
