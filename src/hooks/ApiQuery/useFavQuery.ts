import { useQuery } from '@tanstack/react-query';
import * as ideaService from '~/services/idea.service';
import * as problemService from '~/services/problem.service';

export function useFavIdList() {
  return useQuery({
    queryKey: ['favoriteId'],
    queryFn: async () => {
      try {
        const [resIdIdea, resIdPro] = await Promise.all([
          ideaService.favIdIdeas(),
          problemService.favIdPro(),
        ]);
        return [...resIdIdea, ...resIdPro];
      } catch (err) {
        console.error('Error fetching favorites:', err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
