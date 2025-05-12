'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/registry/icons/icon';

type PlusProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    line1: {
      initial: {
        rotate: 0,
        transition: { ease: 'easeInOut', duration: 0.4, delay: 0.1 },
      },
      animate: {
        rotate: 90,
        transition: { ease: 'easeInOut', duration: 0.4, delay: 0.1 },
      },
    },
    line2: {
      initial: {
        rotate: 0,
        transition: { ease: 'easeInOut', duration: 0.4 },
      },
      animate: {
        rotate: 90,
        transition: { ease: 'easeInOut', duration: 0.4 },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: PlusProps) {
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
      <motion.line
        x1={12}
        y1={5}
        x2={12}
        y2={19}
        variants={variants.line1}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={5}
        y1={12}
        x2={19}
        y2={12}
        variants={variants.line2}
        initial="initial"
        animate={controls}
      />
    </svg>
  );
}

function Plus(props: PlusProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Plus,
  Plus as PlusIcon,
  type PlusProps,
  type PlusProps as PlusIconProps,
};
