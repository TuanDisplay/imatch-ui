import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

import * as favService from '~/services/myfavorite.service';
import { useFavList } from '~/hooks/ApiQuery/useFavQuery';


interface IFavToggle {
  id: string;
}

export default function FavToggle({ id }: IFavToggle) {
  const [loading, setLoading] = useState(false);

  const { data: favList, refetch } = useFavList();
  const favoriteSet = useMemo(() => {
    return new Set(favList?.map((fav) => fav.post_uuid));
  }, [favList]);

  const handleApiAddFav = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!favoriteSet.has(id)) {
        await favService.addFav(id, 'ideas');
        await refetch();
        toast.success('Đã thêm vào yêu thích!');
      } else {
        await favService.deleteFav(id);
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
