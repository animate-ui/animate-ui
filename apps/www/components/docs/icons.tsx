'use client';

import { index } from '@/__registry__';
import { MotionHighlight } from '@/registry/effects/motion-highlight';
import { AnimateIcon } from '@/registry/icons/icon';
import { Tabs, TabsList, TabsTrigger } from '@/registry/radix/tabs';
import { Input } from '@workspace/ui/components/ui/input';

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
          {icons.map((icon) => (
            <AnimateIcon key={icon.name} animateOnHover>
              <div className="relative flex items-center justify-center size-full aspect-square rounded-lg p-2.5">
                <icon.component className="text-current size-full" />

                <div className="absolute inset-0 bg-muted rounded-lg -z-2" />
              </div>
            </AnimateIcon>
          ))}
        </MotionHighlight>
      </div>
    </div>
  );
};
