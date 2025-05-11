'use client';

import * as React from 'react';
import {
  useAnimation,
  type AnimationControls,
  type Variants,
} from 'motion/react';

const staticVariantsList = {
  path: {
    initial: { pathLength: 1, opacity: 1 },
    animate: {
      pathLength: [0, 1],
      opacity: [0, 1],
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  } as Variants,
} as const;

type StaticVariantsList = keyof typeof staticVariantsList;

interface AnimateIconContextValue {
  controls: AnimationControls;
  animation: StaticVariantsList | string;
}

interface AnimateIconProps {
  animate?: boolean;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  animation?: StaticVariantsList | string;
  children: React.ReactElement<any, any>;
}

interface IconProps<T> extends React.ComponentProps<'svg'> {
  size?: number;
  animation?: T | StaticVariantsList;
  animate?: boolean;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
}

interface IconWrapperProps<T> extends IconProps<T> {
  icon: React.ComponentType<IconProps<T>>;
}

const AnimateIconContext = React.createContext<AnimateIconContextValue | null>(
  null,
);

function useAnimateIconContext() {
  const context = React.useContext(AnimateIconContext);
  if (!context)
    throw new Error('useAnimateIconContext must be used within AnimateIcon');
  return context;
}

function AnimateIcon({
  animate,
  animateOnHover,
  animateOnTap,
  animation = 'default',
  children,
}: AnimateIconProps) {
  const controls = useAnimation();

  React.useEffect(() => {
    if (animate === true) controls.start('animate');
    else if (animate === false) controls.start('initial');
  }, [animate, controls]);

  const handleMouseEnter = (e: MouseEvent) => {
    if (animateOnHover) controls.start('animate');
    children.props?.onMouseEnter?.(e);
  };
  const handleMouseLeave = (e: MouseEvent) => {
    if (animateOnHover || animateOnTap) controls.start('initial');
    children.props?.onMouseLeave?.(e);
  };
  const handlePointerDown = (e: PointerEvent) => {
    if (animateOnTap) controls.start('animate');
    children.props?.onPointerDown?.(e);
  };
  const handlePointerUp = (e: PointerEvent) => {
    if (animateOnTap) controls.start('initial');
    children.props?.onPointerUp?.(e);
  };

  const child = React.Children.only(children);
  const cloned = React.cloneElement(child, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
  });

  return (
    <AnimateIconContext.Provider value={{ controls, animation }}>
      {cloned}
    </AnimateIconContext.Provider>
  );
}

function IconWrapper<T extends string>({
  ref,
  size = 28,
  animation: animationProp,
  animate,
  animateOnHover,
  animateOnTap,
  icon: IconComponent,
  ...props
}: IconWrapperProps<T>) {
  if (
    animate !== undefined ||
    animateOnHover ||
    animateOnTap ||
    animationProp
  ) {
    return (
      <AnimateIcon
        animate={animate}
        animateOnHover={animateOnHover}
        animateOnTap={animateOnTap}
        animation={animationProp}
      >
        <IconComponent ref={ref} size={size} {...props} />
      </AnimateIcon>
    );
  }

  return <IconComponent ref={ref} size={size} {...props} />;
}

function getVariants<
  V extends { default: T; [key: string]: T },
  T extends Record<string, Variants>,
>(variantsList: V, animationType: keyof V | StaticVariantsList): T {
  if (animationType in staticVariantsList) {
    const variant = staticVariantsList[animationType as StaticVariantsList];
    const result = {} as T;
    for (const key in variantsList.default) {
      result[key] = variant as T[Extract<keyof T, string>];
    }
    return result;
  }

  return variantsList[animationType as keyof V] as T;
}

export {
  AnimateIcon,
  IconWrapper,
  useAnimateIconContext,
  getVariants,
  type IconProps,
  type IconWrapperProps,
  type AnimateIconProps,
  type AnimateIconContextValue,
};
