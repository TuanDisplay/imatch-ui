import {
  CalendarDays,
  ArrowRight,
  Settings,
  CircleDollarSign,
  Lightbulb,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { IProCard } from '~/common/types/problem';
import { DelMyProduct, EditMyProduct } from '~/components/ManaMyProduct';
import FavToggle from '~/components/FavToggle';
import {
  convertCategoryName,
  convertCurrencyVN,
  convertHtmlToText,
  convertIsoDate,
} from '~/utils/files';

export default function ProblemItem({
  id,
  imageUrl,
  catValue,
  title,
  desc,
  price,
  submission,
  publishDate,
  isActive,
  isDelete,
  innerRef,
}: IProCard) {
  const location = useLocation();

  return (
    <div className="hover:shadow-primary relative mx-auto flex max-w-4xl gap-6 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300">
      {!location.pathname.includes('/profile') ? (
        <FavToggle id={id} type="problem" />
      ) : (
        <div className="flex items-center gap-2">
          {isActive === 0 && isDelete === 0 && <EditMyProduct id={id} typeLink='problem-edit'/>}
          <DelMyProduct id={id} type="problem" />
        </div>
      )}
      <img
        src={imageUrl}
        alt="idea-item"
        className="h-48 w-48 rounded-xl object-cover shadow-sm"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-primary text-sm font-semibold">Tên Vấn Đề</h3>
          <p className="font-medium text-gray-800">{title}</p>

          <h4 className="text-primary mt-4 text-sm font-semibold">
            Mô Tả Vấn Đề
          </h4>
          <p className="line-clamp-3 font-medium text-gray-700">
            {convertHtmlToText(desc)}
          </p>
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
            ref={innerRef}
            className="flex items-center gap-1 font-semibold text-green-600 hover:underline"
          >
            Xem Thêm <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
