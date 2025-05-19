import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import * as problemService from '~/services/problem.service';
import { IProCard } from '~/common/types/problem';
import { mapPro, mapProDe } from '~/utils/map/problem';

export function useProblem() {
  return useQuery({
    queryKey: ['problem'],
    queryFn: async (): Promise<IProCard[]> => {
      const res = await problemService.problem();
      return res.items.map(mapPro);
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useProblemDetail(id: string) {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ['problemDetail', id],
    queryFn: async () => {
      const res = await problemService.problemDetail(id);
      const data = mapProDe(res.data);
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

export function useMyProblem() {
  return useQuery({
    queryKey: ['problem'],
    queryFn: async (): Promise<IProCard[]> => {
      const res = await problemService.myProblem();
      return res.items.map(mapPro);
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}