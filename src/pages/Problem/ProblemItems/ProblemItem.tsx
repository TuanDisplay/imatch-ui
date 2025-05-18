import {
  CalendarDays,
  ArrowRight,
  Settings,
  CircleDollarSign,
  Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { IProCard } from '~/common/types/problem';
import { convertCategoryName, convertCurrencyVN, convertHtmlToText, convertIsoDate } from '~/utils/files';

export default function ProblemItem({
  id,
  imageUrl,
  catValue,
  title,
  desc,
  price,
  submission,
  publishDate,
}: IProCard) {
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
          <p className="line-clamp-3 font-medium text-gray-700">{convertHtmlToText(desc)}</p>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <CalendarDays size={16} />
              <span>{convertIsoDate(publishDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleDollarSign size={16} />
              <span>{convertCurrencyVN(price)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Lightbulb size={16} />
              <span>{submission} đề xuất</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings size={16} />
              <span>{convertCategoryName(catValue)}</span>
            </div>
          </div>

          <Link
            to={`/problem/${id}`}
            className="flex items-center gap-1 font-semibold text-green-600 hover:underline"
          >
            Xem Thêm <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
