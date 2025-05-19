import { useQuery } from '@tanstack/react-query';
import { IFavApi } from '~/common/types';
import * as favService from '~/services/myfavorite.service';

export function useFavList() {
  return useQuery({
    queryKey: ['favorite-ideas'],
    queryFn: async (): Promise<IFavApi[]> => {
      const res = await favService.favList();
      return res.items;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}

// export function useProFav(postType: string) {
//   return useQuery({
//     queryKey: ['favorite-pro'],
//     queryFn: async (): Promise<IFavApi[]> => {
//       const res = await favService.favProList(postType);
//       return res.items;
//     },
//     staleTime: 1000 * 60 * 5,
//     retry: 2,
//   });
// }
