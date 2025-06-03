import { useQuery } from '@tanstack/react-query';
import { IUser } from '~/common/types/user';
import * as userService from '~/services/user.service';
import { mapUProfile } from '~/utils/map/user';

export const useUProfile = () => {
  const token = localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<IUser> => {
      const data = await userService.profile();
      return mapUProfile(data);
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: !!token,
  });
};
