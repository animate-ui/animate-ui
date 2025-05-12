'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/registry/icons/icon';

type ClockProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    circle: {},
    hours: {
      initial: {
        rotate: 0,
        transition: { ease: 'easeInOut', duration: 0.5 },
      },
      animate: {
        transformOrigin: 'bottom left',
        rotate: 20,
        transition: { ease: 'easeInOut', duration: 0.5 },
      },
    },
    minutes: {
      initial: {
        rotate: 0,
        transition: { ease: 'easeInOut', duration: 0.7 },
      },
      animate: {
        transformOrigin: 'top left',
        rotate: 360,
        transition: { ease: 'easeInOut', duration: 0.7 },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: ClockProps) {
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
      <motion.circle
        cx={12}
        cy={12}
        r={10}
        variants={variants.circle}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={12}
        y1={8.1}
        x2={12}
        y2={12}
        variants={variants.hours}
        initial="initial"
        animate={controls}
      />
      <motion.line
        x1={12}
        y1={12}
        x2={17.5}
        y2={15.9}
        variants={variants.minutes}
        initial="initial"
        animate={controls}
      />
    </svg>
  );
}

function Clock(props: ClockProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Clock,
  Clock as ClockIcon,
  type ClockProps,
  type ClockProps as ClockIconProps,
};
