'use client';

import * as React from 'react';
import {
  Popover as PopoverPrimitive,
  PopoverButton as PopoverButtonPrimitive,
  PopoverPanel as PopoverPanelPrimitive,
  PopoverBackdrop as PopoverBackdropPrimitive,
  PopoverGroup as PopoverGroupPrimitive,
  type PopoverProps as PopoverPrimitiveProps,
  type PopoverButtonProps as PopoverButtonPrimitiveProps,
  type PopoverPanelProps as PopoverPanelPrimitiveProps,
  type PopoverBackdropProps as PopoverBackdropPrimitiveProps,
  type PopoverGroupProps as PopoverGroupPrimitiveProps,
} from '@headlessui/react';
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';

import { cn } from '@workspace/ui/lib/utils';

type PopoverContextType = {
  isOpen: boolean;
};

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined,
);

const usePopover = (): PopoverContextType => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopover must be used within a Popover');
  }
  return context;
};

type PopoverProps<TTag extends React.ElementType = 'div'> =
  PopoverPrimitiveProps<TTag> & {
    as?: TTag;
  };

function Popover<TTag extends React.ElementType = 'div'>({
  children,
  ...props
}: PopoverProps<TTag>) {
  return (
    <PopoverPrimitive data-slot="popover" {...props}>
      {(bag) => (
        <PopoverContext.Provider value={{ isOpen: bag.open }}>
          {typeof children === 'function' ? children(bag) : children}
        </PopoverContext.Provider>
      )}
    </PopoverPrimitive>
  );
}

type PopoverButtonProps<TTag extends React.ElementType = 'button'> =
  PopoverButtonPrimitiveProps<TTag> & {
    as?: TTag;
  };

function PopoverButton<TTag extends React.ElementType = 'button'>(
  props: PopoverButtonProps<TTag>,
) {
  return <PopoverButtonPrimitive data-slot="popover-button" {...props} />;
}

type PopoverBackdropProps<TTag extends React.ElementType = 'div'> =
  PopoverBackdropPrimitiveProps<TTag> & {
    as?: TTag;
  };

function PopoverBackdrop<TTag extends React.ElementType = 'div'>(
  props: PopoverBackdropProps<TTag>,
) {
  return <PopoverBackdropPrimitive data-slot="popover-backdrop" {...props} />;
}

type PopoverGroupProps<TTag extends React.ElementType = 'div'> =
  PopoverGroupPrimitiveProps<TTag> & {
    as?: TTag;
  };

function PopoverGroup<TTag extends React.ElementType = 'div'>(
  props: PopoverGroupProps<TTag>,
) {
  return <PopoverGroupPrimitive data-slot="popover-group" {...props} />;
}

type PopoverPanelProps<TTag extends React.ElementType = 'div'> = Omit<
  PopoverPanelPrimitiveProps<TTag>,
  'transition'
> &
  Omit<HTMLMotionProps<'div'>, 'children'> & {
    transition?: Transition;
    as?: TTag;
  };

function PopoverPanel(props: PopoverPanelProps) {
  const {
    children,
    className,
    transition = { type: 'spring', stiffness: 300, damping: 25 },
    anchor = { to: 'bottom', gap: 4 },
    as = motion.div,
    ...rest
  } = props;
  const { isOpen } = usePopover();

  return (
    <AnimatePresence>
      {isOpen && (
        <PopoverPanelPrimitive
          key="popover-panel"
          data-slot="popover-panel"
          static
          as={as}
          initial={{ opacity: 0, scale: 0.5, transition }}
          animate={{ opacity: 1, scale: 1, transition }}
          exit={{ opacity: 0, scale: 0.5, transition }}
          className={cn(
            'w-72 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-none z-50',
            className,
          )}
          anchor={anchor}
          {...rest}
        >
          {children}
        </PopoverPanelPrimitive>
      )}
    </AnimatePresence>
  );
}

export {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverBackdrop,
  PopoverGroup,
  type PopoverProps,
  type PopoverButtonProps,
  type PopoverPanelProps,
  type PopoverBackdropProps,
  type PopoverGroupProps,
};
