import { useQuery } from '@tanstack/react-query';
import { api, LeaderboardEntry } from '../services/api';

export const useLeaderboard = (type: 'points' | 'purchases' | 'streaming') => {
  return useQuery({
    queryKey: ['leaderboard', type],
    queryFn: () => api.getLeaderboard(type),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};