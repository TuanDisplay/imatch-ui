import { useQuery } from '@tanstack/react-query';
import { IUMesApi, IUMesDeApi } from '~/common/types/message';
import * as messageService from '~/services/message.service';

export const useMessage = () => {
  return useQuery({
    queryKey: ['message'],
    queryFn: async (): Promise<IUMesApi[]> => {
      const res = await messageService.messages();
      return res.partners;
    },
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
