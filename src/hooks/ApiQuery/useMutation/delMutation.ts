// hooks/useDeleteItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import * as ideaService from '~/services/idea.service';
import * as problemService from '~/services/problem.service';

interface useDeleteMuta {
  id: string;
  type: 'idea' | 'problem';
}

export const useDeleteMuta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: useDeleteMuta) => {
      return type === 'idea'
        ? ideaService.deleteMyIdeas(id)
        : problemService.deleteMyPro(id);
    },
    onSuccess: (_, { type }) => {
      const key = type === 'idea' ? 'ideas' : 'problem';
      queryClient.invalidateQueries({ queryKey: [key] });
      toast.success('Xoá thành công!');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xoá!');
    },
  });
};
