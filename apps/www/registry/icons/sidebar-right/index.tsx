'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/registry/icons/icon';

type PanelRightProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    rect: {},
    bar: {
      initial: { x1: 13.5, y1: 19.5, x2: 13.5, y2: 4.5 },
      animate: {
        x1: 17,
        y1: 19.5,
        x2: 17,
        y2: 4.5,
        transition: { type: 'spring', damping: 20, stiffness: 200 },
      },
    },
    content1: {
      initial: { x1: 16.2, y1: 8.7, x2: 18.2, y2: 8.7, opacity: 1, scale: 1 },
      animate: {
        x1: 19,
        y1: 8.7,
        x2: 19,
        y2: 8.7,
        opacity: 0,
        scale: 0,
        transition: { type: 'spring', damping: 20, stiffness: 200 },
      },
    },
    content2: {
      initial: { x1: 16.2, y1: 12, x2: 18.2, y2: 12, opacity: 1, scale: 1 },
      animate: {
        x1: 19,
        y1: 12,
        x2: 19,
        y2: 12,
        opacity: 0,
        scale: 0,
        transition: { type: 'spring', damping: 20, stiffness: 200 },
      },
    },
    content3: {
      initial: { x1: 16.2, y1: 15.3, x2: 18.2, y2: 15.3, opacity: 1, scale: 1 },
      animate: {
        x1: 19,
        y1: 15.3,
        x2: 19,
        y2: 15.3,
        opacity: 0,
        scale: 0,
        transition: { type: 'spring', damping: 20, stiffness: 200 },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: PanelRightProps) {
  const { controls, animation: animationType } = useAnimateIconContext();

  const variants = getVariants(
    animations,
    animationType as keyof typeof animations,
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.rect
        width={18}
        height={15}
        x={3}
        y={4.5}
        rx={3}
        ry={3}
        variants={variants.rect}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={13.5}
        y1={19.5}
        x2={13.5}
        y2={4.5}
        variants={variants.bar}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={16.2}
        y1={8.7}
        x2={18.2}
        y2={8.7}
        variants={variants.content1}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={16.2}
        y1={12}
        x2={18.2}
        y2={12}
        variants={variants.content2}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={16.2}
        y1={15.3}
        x2={18.2}
        y2={15.3}
        variants={variants.content3}
        initial="initial"
        animate={controls}
      />
    </svg>
  );
}

function PanelRight(props: PanelRightProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  PanelRight,
  PanelRight as PanelRightIcon,
  type PanelRightProps,
  type PanelRightProps as PanelRightIconProps,
};
