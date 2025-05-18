import { AxiosError } from 'axios';
import {
  CalendarDays,
  Eye,
  User,
  ArrowRight,
  Settings,
  Heart,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { IIdeaCard } from '~/common/types/idea';
import { useFavList } from '~/hooks/ApiQuery/useFavQuery';
import * as favService from '~/services/myfavorite.service';
import {
  convertCategoryName,
  convertHtmlToText,
  convertIsoDate,
  convertPartName,
} from '~/utils/files';

export default function IdeaItem({
  id,
  imageUrl,
  catValue,
  title,
  desc,
  author,
  views,
  publishDate,
}: IIdeaCard) {
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
    <div className="hover:shadow-primary relative mx-auto flex max-w-4xl cursor-pointer gap-6 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300">
      <div
        className="group absolute top-0 right-0 mt-4 mr-4"
        onClick={handleApiAddFav}
      >
        {favoriteSet.has(id) ? (
          <Heart size={18} fill="#ff6e00" stroke="#ff6e00" />
        ) : (
          <Heart size={18} className="hover:text-primary" />
        )}
      </div>
      <img
        src={imageUrl}
        alt="idea-item"
        className="h-48 w-48 rounded-xl object-cover shadow-sm"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-primary text-sm font-semibold">Tên Ý Tưởng</h3>
          <p className="font-medium text-gray-800">{title}</p>

          <h4 className="text-primary mt-4 text-sm font-semibold">
            Mô Tả Ý Tưởng
          </h4>
          <p className="line-clamp-3 font-medium text-gray-700">
            {convertHtmlToText(desc)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <div className="flex items-center gap-1">
              <CalendarDays size={16} />
              <span className="line-clamp-1">
                {convertIsoDate(publishDate)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              <span title={author} className="line-clamp-1">
                {convertPartName(author)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span className="line-clamp-1">{views} lượt xem</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings size={16} />
              <span title={catValue} className="line-clamp-1">
                {convertCategoryName(catValue)}
              </span>
            </div>
          </div>

          <Link
            to={`/exchange/${id}`}
            className="flex items-center gap-1 font-semibold whitespace-nowrap text-green-600 hover:underline"
          >
            Xem Thêm <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
