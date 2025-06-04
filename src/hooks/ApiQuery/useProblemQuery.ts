import React from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import * as problemService from '~/services/problem.service';
import { IProPageApi, ISolutionPageApi } from '~/common/types/problem';
import { mapProDe } from '~/utils/map/problem';

interface UseProParams {
  top_view_only?: boolean;
  page?: number;
  limit?: number;
  industry?: string;
  problemname?: string;
  price_tier?: string;
  [key: string]: any;
}

export function useProblem(params: UseProParams = {}) {
  return useQuery({
    queryKey: ['problem', params],
    queryFn: async (): Promise<IProPageApi> => {
      const res = await problemService.problem(params);
      return res;
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

export function useMyProScroll() {
  return useInfiniteQuery({
    queryKey: ['myProblem'],
    queryFn: problemService.myProblem,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length ? pages.length + 1 : undefined;
    },
  });
}

export function useFavProScroll() {
  return useInfiniteQuery({
    queryKey: ['favProblem'],
    queryFn: problemService.favProblem,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length ? pages.length + 1 : undefined;
    },
  });
}

// Solutions
export function useSolution(problem_id: string, params: UseProParams = {}) {
  return useQuery({
    queryKey: ['solutions', params, problem_id],
    queryFn: async (): Promise<ISolutionPageApi> => {
      const res = await problemService.solutions(problem_id, params);
      return res;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

export function useMySolutionScroll() {
  return useInfiniteQuery({
    queryKey: ['mySolution'],
    queryFn: problemService.mySolutions,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage !== null) {
        return lastPage.length ? pages.length + 1 : undefined;
      } else {
        return undefined;
      }
    },
  });
}
