import {
  CalendarDays,
  Eye,
  ArrowRight,
  Settings,
  CircleDollarSign,
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import { IIdeaCard } from '~/common/types/idea';
import { DelMyProduct, EditMyProduct } from '~/components/ManaMyProduct';
import FavToggle from '~/components/FavToggle';

import {
  convertCategoryName,
  convertCurrencyVN,
  convertHtmlToText,
  convertIsoDate,
} from '~/utils/files';

export default function IdeaItem({
  id,
  imageUrl,
  catValue,
  title,
  desc,
  price,
  views,
  publishDate,
  isActive,
  isDelete,
  innerRef,
}: IIdeaCard) {
  const location = useLocation();

  return (
    <div className="hover:shadow-primary relative mx-auto flex max-w-4xl gap-6 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300">
      {!location.pathname.includes('/profile') ? (
        <FavToggle id={id} type="idea" />
      ) : (
        <div className="flex items-center gap-2">
          {isActive === 0 && isDelete === 0 && (
            <EditMyProduct id={id} typeLink="idea-edit" />
          )}
          <DelMyProduct id={id} type="idea" />
        </div>
      )}
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
              <CircleDollarSign size={16} />
              <span className="line-clamp-1">{convertCurrencyVN(price)}</span>
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
            ref={innerRef}
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
