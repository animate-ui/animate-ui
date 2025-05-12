'use client';

import * as React from 'react';
import {
  useAnimation,
  type AnimationControls,
  type Variants,
} from 'motion/react';

const staticAnimations = {
  path: {
    initial: { pathLength: 1, opacity: 1 },
    animate: {
      pathLength: [0, 1],
      opacity: [0, 1],
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  } as Variants,
} as const;

type StaticAnimations = keyof typeof staticAnimations;

interface AnimateIconContextValue {
  controls: AnimationControls;
  animation: StaticAnimations | string;
}

interface AnimateIconProps {
  animate?: boolean;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  animation?: StaticAnimations | string;
  children: React.ReactElement<any, any>;
}

interface IconProps<T> extends React.ComponentProps<'svg'> {
  size?: number;
  animation?: T | StaticAnimations;
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
  const context = React.useContext(AnimateIconContext);

  if (context) {
    const { controls, animation: parentAnimation } = context;
    const animationToUse = animationProp ?? parentAnimation;

    return (
      <AnimateIconContext.Provider
        value={{ controls, animation: animationToUse }}
      >
        <IconComponent ref={ref} size={size} {...props} />
      </AnimateIconContext.Provider>
    );
  }

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
>(animations: V, animationType: keyof V | StaticAnimations): T {
  if (animationType in staticAnimations) {
    const variant = staticAnimations[animationType as StaticAnimations];
    const result = {} as T;
    for (const key in animations.default) {
      result[key] = variant as T[Extract<keyof T, string>];
    }
    return result;
  }

  return animations[animationType as keyof V] as T;
}

export {
  staticAnimations,
  AnimateIcon,
  IconWrapper,
  useAnimateIconContext,
  getVariants,
  type IconProps,
  type IconWrapperProps,
  type AnimateIconProps,
  type AnimateIconContextValue,
};
