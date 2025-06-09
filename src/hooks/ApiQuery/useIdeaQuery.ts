import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IIdeaPageApi } from '~/common/types/idea';
import * as ideaService from '~/services/idea.service';
import { mapIdeaDe } from '~/utils/map/idea';

interface UseIdeasParams {
  top_view_only?: boolean;
  page?: number;
  limit?: number;
  industry?: string;
  ideasname?: string;
  price_tier?: string;
  [key: string]: any;
}

export function useIdeas(params: UseIdeasParams = {}) {
  return useQuery({
    queryKey: ['ideas', params],
    queryFn: async (): Promise<IIdeaPageApi> => {
      const res = await ideaService.ideas(params);
      return res;
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

export function useMyIdeasScroll() {
  return useInfiniteQuery({
    queryKey: ['myIdeas'],
    queryFn: ideaService.myIdeas,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length ? pages.length + 1 : undefined;
    },
  });
}

export function useFavIdeasScroll() {
  return useInfiniteQuery({
    queryKey: ['favIdeas'],
    queryFn: ideaService.favIdeas,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length ? pages.length + 1 : undefined;
    },
  });
}

export function useBuyIdeasScroll() {
  return useInfiniteQuery({
    queryKey: ['buyIdeas'],
    queryFn: ideaService.buyIdeas,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return Array.isArray(lastPage) ? pages.length + 1 : undefined;
    },
  });
}
