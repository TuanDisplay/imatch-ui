import { useQuery } from '@tanstack/react-query';
import { TProfileSchema } from '~/common/schema';
import * as userService from '~/services/user.service';
import { mapUProfile } from '~/utils/map/user';

export const useUProfile = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<TProfileSchema> => {
      const data = userService.profile();
      return mapUProfile(await data);
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
