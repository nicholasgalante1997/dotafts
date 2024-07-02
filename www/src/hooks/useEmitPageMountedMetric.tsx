import { useEffect } from 'react';
import { useEmitEvent } from './useEmitEvent';

function useEmitPageMountedMetric(page: string, data: Record<string, any> = {}) {
  const { emit } = useEmitEvent<{
    page: typeof page;
    data: typeof data;
  }>({
    data: {
      page,
      data
    },
    type: 'Page-Mount'
  });
  useEffect(() => {
    emit();
  }, []);
}

export default useEmitPageMountedMetric;
