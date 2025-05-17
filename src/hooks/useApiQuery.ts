import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IFavoriteListApi, IIdeaCard } from '~/common/types';
import * as ideaService from '~/services/idea.service';
import * as favService from '~/services/myfavorite.service';
import { mapIdeaDetailList, mapIdeaList } from '~/utils/mapList';

export function useIdeas() {
  return useQuery({
    queryKey: ['ideas'],
    queryFn: async (): Promise<IIdeaCard[]> => {
      const res = await ideaService.ideas();
      return res.items.map(mapIdeaList);
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
      const data = mapIdeaDetailList(res.data);
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

// my-favorite

export function useFavList() {
  return useQuery({
    queryKey: ['favorite-ideas'],
    queryFn: async ():Promise<IFavoriteListApi[]> => {
      const res = await favService.favList();
      return res.items;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
