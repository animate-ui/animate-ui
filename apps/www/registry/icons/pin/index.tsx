'use client';

import * as React from 'react';
import { motion, Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/registry/icons/icon';

type MapPinProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    group: {
      initial: {
        scale: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        transformOrigin: 'bottom center',
        transition: { ease: 'easeInOut', duration: 0.3 },
      },
      animate: {
        scale: [1, 0.75, 1, 1],
        rotate: [0, 30, -15, 0],
        translateX: [0, 0, 0, 0],
        translateY: [0, -6, 0, 0],
        transformOrigin: 'bottom center',
        transition: { ease: 'easeInOut', duration: 1 },
      },
    },
    circle: {},
    pin: {},
  } satisfies Record<string, Variants>,
  wiggle: {
    group: {
      initial: {
        rotate: 0,
        transformOrigin: 'bottom center',
        transition: { ease: 'easeInOut', duration: 0.3 },
      },
      animate: {
        rotate: [0, 20, -15, 0],
        transformOrigin: 'bottom center',
        transition: { ease: 'easeInOut', duration: 1 },
      },
    },
    circle: {},
    pin: {},
  } satisfies Record<string, Variants>,
  rotate: {
    group: {
      initial: {
        transform: 'rotate3d(0, 1, 0, 0deg)',
        transition: { ease: 'easeInOut', duration: 0.7 },
      },
      animate: {
        transform: 'rotate3d(0, 1, 0, 360deg)',
        transition: { ease: 'easeInOut', duration: 0.7 },
      },
    },
    circle: {},
    pin: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: MapPinProps) {
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
      style={{ perspective: '600px' }}
      {...props}
    >
      <motion.g variants={variants.group} initial="initial" animate={controls}>
        <motion.line
          x1={12}
          y1={16.15}
          x2={12}
          y2={22}
          variants={variants.line}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="M17.25,13.87h0c0-.57-.22-1.13-.62-1.55l-1.88-2.01c-.31-.33-.48-.75-.49-1.19l-.04-1.89c0-.43.13-.84.41-1.18l.9-1.1c.27-.33.41-.74.41-1.17h0c-.02-.99-.83-1.78-1.83-1.78h-4.2c-1,0-1.82.79-1.83,1.78h0c0,.42.14.84.41,1.17l.9,1.1c.27.33.42.75.41,1.18l-.04,1.89c0,.44-.18.87-.49,1.19l-1.88,2.01c-.4.42-.62.98-.62,1.55h0c0,1.26,1.03,2.28,2.31,2.28h5.88c1.28,0,2.31-1.02,2.31-2.28Z"
          variants={variants.pin}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </svg>
  );
}

function MapPin(props: MapPinProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  MapPin,
  MapPin as MapPinIcon,
  type MapPinProps,
  type MapPinProps as MapPinIconProps,
};
