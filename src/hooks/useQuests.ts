import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Quest } from '../services/api';
import { useToast } from './useToast';

export const useQuests = (type?: string) => {
  return useQuery({
    queryKey: ['quests', type],
    queryFn: () => api.getQuests(type),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCompleteQuest = () => {
  const queryClient = useQueryClient();
  const { success } = useToast();

  return useMutation({
    mutationFn: api.completeQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      success('Quest completed!', 'You earned points for completing this quest.');
    },
  });
};