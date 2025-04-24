import { Link } from 'react-router-dom';
import {
  CalendarDays,
  CircleDollarSign,
  Eye,
  Lightbulb,
  User,
} from 'lucide-react';
import Button from '~/components/Button';
import { ICardItem } from '~/common/types';

export default function CardItem({
  imageUrl,
  category,
  title,
  desc,
  author,
  views,
  publishDate,
  award,
  submission,
}: ICardItem) {
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
          <Link to="/profile/:slug">{title}</Link>
        </h2>

        {desc && <p className="line-clamp-3 text-sm font-light">{desc}</p>}

        <div className="mt-2 grid grid-cols-2 gap-y-2">
          <div className="flex items-center gap-2">
            {author ? (
              <User className="h-5 w-5" />
            ) : (
              <CircleDollarSign className="h-5 w-5" />
            )}
            {author ? (
              <div title={author} className="line-clamp-1 text-sm">
                {author}
              </div>
            ) : (
              <div className="line-clamp-1 text-sm font-bold">{award} $</div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 pr-2">
            {views ? (
              <Eye className="h-5 w-5" />
            ) : (
              <Lightbulb className="h-5 w-5" />
            )}
            {views ? (
              <div className="line-clamp-1 text-sm">{views} lượt xem</div>
            ) : (
              <div className="line-clamp-1 text-sm">{submission} đề xuất</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            <div className="line-clamp-1 text-sm">{publishDate}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="px-3 py-1.5 text-lg font-bold" primary>
            Chi tiết
          </Button>
        </div>
      </div>
    </section>
  );
}
