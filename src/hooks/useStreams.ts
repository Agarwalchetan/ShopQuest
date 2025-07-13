import { useQuery } from '@tanstack/react-query';
import { api, Stream } from '../services/api';

export const useStreams = () => {
  return useQuery({
    queryKey: ['streams'],
    queryFn: api.getStreams,
    staleTime: 1000 * 60 * 2, // 2 minutes for live data
  });
};

export const useStream = (id: string) => {
  return useQuery({
    queryKey: ['stream', id],
    queryFn: () => api.getStream(id),
    enabled: !!id,
    staleTime: 1000 * 30, // 30 seconds for live stream data
  });
};