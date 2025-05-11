'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/registry/icons/icon';

type CrossProps = IconProps<keyof typeof variantsList>;

const variantsList = {
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

function IconComponent({ size, ...props }: CrossProps) {
  const { controls, animation: animationType } = useAnimateIconContext();

  const variants = getVariants(
    variantsList,
    animationType as keyof typeof variantsList,
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
        x1={6}
        y1={18}
        x2={18}
        y2={6}
        variants={variants.line1}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={6}
        y1={6}
        x2={18}
        y2={18}
        variants={variants.line2}
        initial="initial"
        animate={controls}
      />
    </svg>
  );
}

function Cross(props: CrossProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  Cross,
  Cross as CrossIcon,
  type CrossProps,
  type CrossProps as CrossIconProps,
};
