import { useState } from 'react';

import { IdeaCard, ProblemCard, ExpertCard } from '~/common/data';
import { IdeaItem } from '~/pages/Exchange/ExchangeItems/';
import { ProblemItem } from '~/pages/Problem/ProblemItems/';
import ExpertItem from '~/pages/Expert/ExpertItems/';

import { WrapperContent } from '~/components/Content';
import clsx from 'clsx';

const list = [
  { id: 1, name: 'Mua - bán ý tưởng', value: 'exchange-idea' },
  { id: 2, name: 'Giải quyết vấn đề', value: 'solving-problem' },
  { id: 3, name: 'Chuyên gia tư vấn', value: 'expert-consult' },
];


export default function Favorate() {
  const [selectedValue, setSelectedValue] = useState<string>('exchange-idea');

  return (
    <>
      <div className="relative flex justify-center">
        <img
          src="/banner/exchange-banner.jpg"
          alt="exchange-banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 container flex translate-y-[-50%] flex-col items-center text-center max-md:hidden">
          <h2 className="text-shadow bg-primary w-fit p-2 text-4xl font-bold text-white uppercase max-md:text-3xl">
            Danh sách yêu thích
          </h2>
          <div className="mx-auto my-5 w-full lg:w-[80%]">
            <div className="text-shadow line-clamp-3 text-xl text-white">
              Nơi để lưu trữ các danh mục yêu thích của bạn.
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl py-5">
        <div className="mt-5 rounded-xl bg-white shadow-xl">
          <div className="flex items-center justify-between gap-10 p-3 font-bold shadow-xl">
            {list.map((item) => {
              return (
                <div
                  key={item.id}
                  className={clsx(
                    'flex-1 cursor-pointer rounded-sm p-1 text-center text-gray-700 transition-colors duration-300 hover:bg-orange-100 hover:text-orange-600',
                    {
                      'bg-orange-100 text-orange-600':
                        selectedValue === item.value,
                    },
                  )}
                  onClick={() => setSelectedValue(item.value)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className="py-5">
            <WrapperContent currentItems={IdeaCard}>
              {IdeaCard.length === 0 ? (
                <div className="">Không có dữ liệu</div>
              ) : (
                IdeaCard.map((item) => {
                  return (
                    <IdeaItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      category={item.category}
                      title={item.title}
                      desc={item.desc}
                      author={item.author}
                      views={item.views}
                      publishDate={item.publishDate}
                    />
                  );
                })
              )}
            </WrapperContent>
          </div>
        </div>
      </div>
    </>
  );
}
