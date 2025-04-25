import { useState } from 'react';

import { usePagination } from '~/hooks/usePagination';
import IdeaItem from './ExchangeItems/IdeaItem';
import PaginationBar from '~/components/PaginationBar';
import { MajorCat, IdeaCard } from '~/common/data';
import { WrapperContent } from '~/components/Content';

export default function Exchange() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 3;
  const DItemsCurrentPage = usePagination(IdeaCard, currentPage, itemsPerPage);

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
            Mua - Bán ý tưởng
          </h2>
          <div className="mx-auto my-5 w-full lg:w-[80%]">
            <div className="text-shadow line-clamp-3 text-xl text-white">
              Ý tưởng không chỉ để chia sẻ – mà còn để định giá và trao đổi
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-5">
        <div className="flex gap-6">
          <aside className="h-fit w-64 rounded-xl bg-white p-4 shadow-lg">
            <div className="bg-primary mb-4 rounded-md py-2 text-center font-semibold text-white">
              Danh Mục
            </div>
            <ul className="space-y-1">
              {MajorCat.map((cat, index) => (
                <li
                  key={index}
                  className="rounded-md border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors last:border-b-0 hover:bg-orange-100 hover:text-orange-600"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex flex-1 flex-col px-4">
            <WrapperContent currentPage={currentPage}>
              {DItemsCurrentPage.map((item) => {
                return (
                  <IdeaItem
                    key={item.id}
                    imageUrl={item.imageUrl}
                    category={item.category}
                    title={item.title}
                    desc={item.desc}
                    author={item.author}
                    views={item.views}
                    publishDate={item.publishDate}
                  />
                );
              })}
            </WrapperContent>
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={IdeaCard.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
