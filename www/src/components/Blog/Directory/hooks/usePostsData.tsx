import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPostsData } from '@/loaders';
import { QueryKeys } from '@/types/Query';

export function usePostsData() {
  return useQuery({
    queryKey: [QueryKeys.Posts],
    queryFn: getPostsData
  });
}
