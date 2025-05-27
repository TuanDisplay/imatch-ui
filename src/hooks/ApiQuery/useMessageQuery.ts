import { useQuery } from '@tanstack/react-query';
import * as messageService from '~/services/message.service';

export const useMessage = (id: string) => {
  return useQuery({
    queryKey: ['message'],
    queryFn: async () => {
      const res = await messageService.oldMessage(id);
      return res;
    },
  });
};
