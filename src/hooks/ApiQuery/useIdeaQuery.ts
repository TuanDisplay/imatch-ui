import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IIdeaCard } from '~/common/types/idea';
import * as ideaService from '~/services/idea.service';
import { mapIdea, mapIdeaDe } from '~/utils/map/idea';

interface UseArticlesParams {
  top_view_only?: boolean;
  category?: string;
  limit?: number;
  [key: string]: any;
}

export function useIdeas(params:  UseArticlesParams = {}) {
  return useQuery({
    queryKey: ['ideas', params],
    queryFn: async (): Promise<IIdeaCard[]> => {
      const res = await ideaService.ideas(params);
      return res.items.map(mapIdea);
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useIdeasDetail(id: string) {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['ideaDetail', id],
    queryFn: async () => {
      const res = await ideaService.ideaDetail(id);
      const data = mapIdeaDe(res.data);
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

export function useMyIdeas() {
  return useQuery({
    queryKey: ['ideas'],
    queryFn: async (): Promise<IIdeaCard[]> => {
      const res = await ideaService.myIdeas();
      return res.items.map(mapIdea);
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
