import { CalendarDays, Eye, User, ArrowRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ICard } from '~/common/types';

export default function IdeaItem({
  id,
  imageUrl,
  category,
  title,
  desc,
  author,
  views,
  publishDate,
}: ICard) {
  return (
    <div className="hover:shadow-primary mx-auto flex max-w-4xl cursor-pointer gap-6 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300">
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
          <p className="line-clamp-3 font-medium text-gray-700">{desc}</p>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <CalendarDays size={16} />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{author}</span>
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
            to={`/exchange/${id}`}
            className="flex items-center gap-1 font-semibold text-green-600 hover:underline"
          >
            Xem Thêm <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
