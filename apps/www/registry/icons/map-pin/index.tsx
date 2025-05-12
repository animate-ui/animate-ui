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
        rotate: [0, 12, -10, 0],
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
        <motion.circle
          cx={12}
          cy={10.55}
          r={3.4}
          variants={variants.circle}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="M9.87,21.24c1.04,1,2.68,1.02,3.75.05,2.75-2.52,6.88-6.88,6.88-10.94,0-4.61-3.81-8.34-8.5-8.34S3.5,5.74,3.5,10.34c0,4.04,3.76,8.37,6.37,10.89Z"
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
