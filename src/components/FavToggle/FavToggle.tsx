import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

import * as ideaService from '~/services/idea.service';
import * as problemService from '~/services/problem.service';
import { useFavIdList } from '~/hooks/ApiQuery/useFavQuery';
import { useQueryClient } from '@tanstack/react-query';

interface IFavToggle {
  id: string;
  type: 'idea' | 'problem';
}

export default function FavToggle({ id, type }: IFavToggle) {
  const [loading, setLoading] = useState(false);
  const { data: favIdList, refetch } = useFavIdList();

  const queryClient = useQueryClient();

  const favoriteSet = useMemo(() => {
    const data = new Set(favIdList?.map((favId) => favId.post_uuid));
    return data;
  }, [favIdList]);

  const handleApiAddFav = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!favoriteSet.has(id)) {
        if (type === 'idea') {
          await ideaService.addFavIdeas(id);
          queryClient.invalidateQueries({ queryKey: ['favIdeas'] });
        } else {
          await problemService.addFavPro(id);
          queryClient.invalidateQueries({ queryKey: ['favProblem'] });
        }
        await refetch();
        toast.success('Đã thêm vào yêu thích!');
      } else {
        if (type === 'idea') {
          await ideaService.deleteFavIdeas(id);
          queryClient.invalidateQueries({ queryKey: ['favIdeas'] });
        } else {
          await problemService.deleteFavPro(id);
          queryClient.invalidateQueries({ queryKey: ['favProblem'] });
        }
        await refetch();
        toast.error('Đã xóa khỏi yêu thích!');
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className="group absolute top-0 right-0 mt-4 mr-4 cursor-pointer"
        onClick={handleApiAddFav}
      >
        {favoriteSet.has(id) ? (
          <Heart size={18} fill="#ff6e00" stroke="#ff6e00" />
        ) : (
          <Heart size={18} className="hover:text-primary" />
        )}
      </div>
    </>
  );
}
