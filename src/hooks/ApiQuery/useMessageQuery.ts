import { useQuery } from '@tanstack/react-query';
import { IUMesApi, IUMesDeApi } from '~/common/types/message';
import * as messageService from '~/services/message.service';

export const useMessage = () => {
  const token = localStorage.getItem('accessToken');
  return useQuery({
    queryKey: ['message'],
    queryFn: async (): Promise<IUMesApi[]> => {
      const res = await messageService.messages();
      return res.partners;
    },
    enabled: !!token,
  });
};

export const useMessageDe = (id: string) => {
  return useQuery({
    queryKey: ['messageDe', id],
    queryFn: async (): Promise<IUMesDeApi[]> => {
      const res = await messageService.oldMessage(id);
      return res;
    },
  });
};
