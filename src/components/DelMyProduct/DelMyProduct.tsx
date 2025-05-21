import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import { useDeleteMuta } from '~/hooks/ApiQuery/useMutation/delMutation';

interface IDelMyProduct {
  id: string;
  type: 'idea' | 'problem';
}

export default function DelMyProduct({ id, type }: IDelMyProduct) {
  const { mutate, isPending } = useDeleteMuta();

  const handleDel = () => {
    mutate({ id: id, type: type });
  };

  return (
    <div
      className={clsx('group absolute top-0 right-0 mt-4 mr-4', {
        'opacity-40': isPending,
      })}
      onClick={handleDel}
    >
      <Trash2 size={20} className="text-red-500" />
    </div>
  );
}
