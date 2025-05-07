import { Link } from 'react-router-dom';
import {
  CalendarDays,
  CircleDollarSign,
  Eye,
  Lightbulb,
  User,
} from 'lucide-react';
import Button from '~/components/Button';
import { ICard } from '~/common/types';

export default function CardItem({
  id,
  type,
  imageUrl,
  category,
  title,
  desc,
  author,
  views,
  publishDate,
  price,
  submission,
}: ICard) {
  return (
    <section className="font-montserrat overflow-hidden rounded-[10px] border-[#E8E5E5] bg-white p-1">
      <div className="relative overflow-hidden rounded-xl p-[14px]">
        <div className="text-LGreen-500 font-VNPro absolute top-6 left-6 inline-flex items-center justify-center rounded-[3px] bg-white px-2.5 py-1.5 text-sm font-semibold">
          {category}
        </div>
        <img
          src={imageUrl}
          alt="dragonfruit"
          className="h-[210px] w-full rounded-[5px]"
        />
      </div>
      <div className="flex flex-auto flex-col gap-2.5 px-4 py-3 pb-4">
        <h2 className="line-clamp-2 text-xl font-bold">
          <Link to={`/${type}/${id}`}>{title}</Link>
        </h2>

        <p className="line-clamp-3 text-sm font-light">{desc}</p>

        <div className="mt-2 grid grid-cols-2 gap-y-2">
          <div className="flex items-center gap-2">
            {author ? <User size={20} /> : <CircleDollarSign size={20} />}
            {author ? (
              <div title={author} className="line-clamp-1 text-sm">
                {author}
              </div>
            ) : (
              <div className="line-clamp-1 text-sm font-bold">{price} $</div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 pr-2">
            {views ? <Eye size={20} /> : <Lightbulb size={20} />}
            <div className="line-clamp-1 text-sm">
              {views ? views + ' lượt xem' : submission + ' đề xuất'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={20} />
            <div className="line-clamp-1 text-sm">{publishDate}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            to={`/${type}/${id}`}
            className="px-3 py-1.5 text-lg font-bold"
            primary
          >
            Chi tiết
          </Button>
        </div>
      </div>
    </section>
  );
}
