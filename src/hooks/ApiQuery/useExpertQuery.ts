import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IExpPageApi } from '~/common/types/expert';
import * as expertService from '~/services/expert.service';
import { mapExpertDe } from '~/utils/map/expert';

interface UseIdeasParams {
  top_view_only?: boolean;
  page?: number;
  limit?: number;
  industry?: string;
  ideasname?: string;
  price_tier?: string;
  [key: string]: any;
}

export const useExpert = (params: UseIdeasParams = {}) => {
  return useQuery({
    queryKey: ['expert', params],
    queryFn: async (): Promise<IExpPageApi> => {
      const res = await expertService.expert(params);
      return res;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export function useExpertDetail(id: string) {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['expertDetail', id],
    queryFn: async () => {
      const res = await expertService.expertDetail(id);
      const data = mapExpertDe(res.data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  React.useEffect(() => {
    if (query.isError) {
      const error = query.error as any;
      if (error?.response?.status === 400 && error?.response?.status === 404) {
        navigate('/not-found');
      }
    }
  }, [query.isError, query.error, navigate]);

  return query;
}
