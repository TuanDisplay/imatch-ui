import {
  Eye,
  ArrowRight,
  Settings,
  Star,
  HeartHandshake,
  Heart,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ICard } from '~/common/types';

export default function ExpertItem({
  id,
  imageUrl,
  category,
  desc,
  author,
  views,
  consultCount,
  rate,
}: ICard) {
  const [isFavorate, setFavorate] = useState<boolean>(false);

  return (
    <div className="hover:shadow-primary relative mx-auto flex max-w-4xl cursor-pointer gap-6 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300">
      <div
        className="group absolute top-0 right-0 mt-4 mr-4"
        onClick={() => setFavorate(!isFavorate)}
      >
        {isFavorate ? (
          <Heart size={18} fill="#ff6e00" stroke="#ff6e00" />
        ) : (
          <Heart size={18} className="hover:text-primary" />
        )}
      </div>
      <img
        src={imageUrl}
        alt="expert-item"
        className="h-48 w-48 rounded-xl object-cover shadow-sm"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-primary text-sm font-semibold">
            Chuyên Gia Tư Vấn
          </h3>
          <p className="font-medium text-gray-800">Ths. {author}</p>
          <h4 className="text-primary mt-4 text-sm font-semibold">
            Giới Thiệu Bản Thân
          </h4>
          <p className="line-clamp-3 font-medium text-gray-700">{desc}</p>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={16} />
              <span>{rate} đánh giá</span>
            </div>
            <div className="flex items-center gap-1">
              <HeartHandshake size={16} />
              <span>{consultCount} lượt tư vấn</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{views} lượt xem</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings size={16} />
              <span>{category}</span>
            </div>
          </div>

          <Link
            to={`/expert/${id}`}
            className="flex items-center gap-1 font-semibold text-green-600 hover:underline"
          >
            Xem Thêm <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
