'use client';

import { index } from '@/__registry__';
import { MotionHighlight } from '@/registry/effects/motion-highlight';
import { AnimateIcon, staticAnimations } from '@/registry/icons/icon';
import { Tabs, TabsList, TabsTrigger } from '@/registry/radix/tabs';
import { Input } from '@workspace/ui/components/ui/input';

const staticAnimationsLength = Object.keys(staticAnimations).length;

export const Icons = () => {
  const icons = Object.values(index).filter((icon) =>
    icon.name.endsWith('-icon'),
  );

  return (
    <div className="mt-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-1.5 mt-0">Icons</h2>
          <p className="text-sm text-muted-foreground">
            {icons.length} icons available
          </p>
        </div>

        <Tabs defaultValue="list" className="mt-2">
          <TabsList>
            <TabsTrigger className="w-[100px]" value="list">
              List
            </TabsTrigger>
            <TabsTrigger className="w-[100px]" value="usage">
              Usage
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Input className="" placeholder="Search icons" />

      <div className="grid grid-cols-11 gap-4 mt-6">
        <MotionHighlight
          className="ring-2 ring-blue-500 bg-transparent rounded-lg -z-1"
          hover
        >
          {icons.map((icon) => {
            const animationsLength = Object.keys(
              icon.component.animations ?? {},
            ).length;
            return (
              <AnimateIcon key={icon.name} animateOnHover>
                <div className="relative group flex items-center justify-center size-full aspect-square rounded-lg p-2.5">
                  <icon.component className="text-current size-full" />

                  <div className="absolute inset-0 bg-muted rounded-lg -z-2" />
                  <div className="absolute -bottom-2.5 -right-2.5 flex items-center justify-center text-muted-foreground font-medium size-5 bg-background border group-hover:border-blue-500 transition-colors duration-200 rounded-full">
                    <span className="text-[11px] leading-none">
                      {staticAnimationsLength + animationsLength}
                    </span>
                  </div>
                </div>
              </AnimateIcon>
            );
          })}
        </MotionHighlight>
      </div>
    </div>
  );
};
