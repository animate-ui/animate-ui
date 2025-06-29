'use client';
import { ShareButton, type ShareButtonProps } from '@/registry/buttons/share';
import { cn } from '@workspace/ui/lib/utils';

type ShareButtonDemoProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  icon?: 'suffix' | 'prefix';
} & ShareButtonProps;

export const ShareButtonDemo = ({
  children,
  className,
  size,
  icon,
  ...props
}: ShareButtonDemoProps) => {
  return (
    <ShareButton {...props} className={cn(className)} size={size} icon={icon}>
      {children}
    </ShareButton>
  );
};
