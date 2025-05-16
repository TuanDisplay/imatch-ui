import { useParams } from 'react-router-dom';
import { CalendarDays, Eye, User, Settings } from 'lucide-react';
import Button from '~/components/Button';
import Link from '~/components/Icons/Link';
import Mail from '~/components/Icons/Mail';
import { IdeaCard } from '~/common/data';
import Overview from './EDItem';
import { convertCategoryName } from '~/utils/files';

export default function ExchangeDetail() {
  const { exchangeId } = useParams();

  const data = IdeaCard.find(
    (item) => item.id.toString() === exchangeId,
  );

  const glancing = [
    { icon: <Eye />, data: data?.views, name: 'Lượt xem' },
    { icon: <User />, data: data?.author },
    { icon: <CalendarDays />, data: data?.publishDate },
    { icon: <Settings />, data: convertCategoryName(data?.catValue) },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="relative isolate overflow-hidden pt-40 pb-25">
          <div className="px-15">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
              <div className="mt-10">
                <h1
                  title={data?.title}
                  className="line-clamp-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                >
                  {data?.title}
                </h1>
                <div className="mt-4 border-y border-gray-300 lg:mt-8">
                  <div className="mb-3 flex flex-col sm:flex-row sm:flex-wrap lg:items-center">
                    {glancing.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="mt-4 flex gap-2 sm:w-1/2 2xl:w-auto"
                        >
                          {item.icon}
                          <span className="">
                            {item.data} {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6 mb-6 text-sm font-bold uppercase">
                  Ý tưởng có tương tác cao
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    className="px-4 py-2 text-sm font-bold uppercase"
                    primary
                  >
                    Mua ý tưởng
                  </Button>
                  <div className="flex h-fit gap-2">
                    <div className="rounded-sm bg-gray-500 p-1">
                      <Mail />
                    </div>
                    <div className="w-fit rounded-sm bg-gray-500 p-1">
                      <Link />
                    </div>
                  </div>
                  <div className="justify-end">
                    <div className="border-b-primary border-b-2 font-semibold">
                      Giá: {data?.price} (VND)
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[450px] w-[560px] overflow-hidden rounded-xl bg-white shadow-lg">
                <img
                  src={data?.imageUrl}
                  alt="thumbnail"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-100 pt-16 pb-24">
        <div className="mx-auto max-w-[1160px]">
          <div className="w-full rounded-2xl bg-white px-5 py-10">
            <div className="flex flex-col items-center">
              <h2 className="border-b-primary w-fit border-b-4 px-3 py-2 text-3xl font-bold uppercase">
                Tổng quan
              </h2>
              <div className="grid grid-cols-1 gap-6 p-6">
                <Overview icon="❗" title="Mô tả ý tưởng" desc={data?.desc} />
                <Overview
                  icon="✅"
                  title="Giá Trị – Lợi Ích"
                  desc={data?.benefitValue}
                />
                <Overview icon="🖼️" title="Hình ảnh" desc={data?.image} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
