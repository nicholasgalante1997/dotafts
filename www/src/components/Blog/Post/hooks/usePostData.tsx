import React from 'react';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getPostData } from '@/loaders';
import { QueryKeys } from '@/types/Query';

export function usePostData(
  id: string,
  options: Omit<UseQueryOptions, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.Post, id],
    queryFn: () => getPostData(id)
  });
}
