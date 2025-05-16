import { useQuery } from '@tanstack/react-query';
import * as ideaService from '~/services/idea.service';
import { mapIdeaList } from '~/utils/mapList';

export function useIdeas() {
  return useQuery({
    queryKey: ['ideas'],
    queryFn: async () => {
      const res = await ideaService.ideas();
      return res.items.map(mapIdeaList); // chuyển đổi dữ liệu
    },
    staleTime: 1000 * 60 * 5, // cache trong 5 phút
    retry: 2, // thử lại 2 lần nếu lỗi
  });
}

export function useProblems() {
  return useQuery({
    queryKey: ['problems'],
    queryFn: async () => {
      const res = await ideaService.ideas();
      return res.items.map(mapIdeaList); // chuyển đổi dữ liệu
    },
    staleTime: 1000 * 60 * 5, // cache trong 5 phút
    retry: 2, // thử lại 2 lần nếu lỗi
  });
}