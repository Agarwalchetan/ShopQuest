import { useQuery } from '@tanstack/react-query';
import { api, Product } from '../services/api';

interface UseProductsOptions {
  category?: string;
  search?: string;
  sortBy?: string;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: () => api.getProducts(options),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};