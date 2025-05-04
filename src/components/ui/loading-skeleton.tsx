
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ChatSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="flex items-start gap-4">
      <Skeleton className="rounded-full h-10 w-10" />
      <div className="w-3/4 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
    <div className="flex items-start gap-4 justify-end">
      <div className="w-3/4 space-y-2">
        <Skeleton className="h-4 w-1/4 ml-auto" />
        <Skeleton className="h-12 w-full" />
      </div>
      <Skeleton className="rounded-full h-10 w-10" />
    </div>
  </div>
);

export const MatchSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <Skeleton className="h-8 w-1/3 mb-4" />
    {Array(3).fill(null).map((_, index) => (
      <div key={index} className="border border-furia-gray/30 rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/5" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-6 w-10" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    ))}
  </div>
);

export const PlayerSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <Skeleton className="h-8 w-1/4 mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(3).fill(null).map((_, index) => (
        <div key={index} className="border border-furia-gray/30 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const NewsSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <Skeleton className="h-8 w-1/4 mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array(4).fill(null).map((_, index) => (
        <div key={index} className="border border-furia-gray/30 rounded-lg overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between mt-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
