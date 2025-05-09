import { useState } from 'react';

import PaginationBar from '~/components/PaginationBar';
import { usePagination } from '~/hooks/usePagination';
import { IdeaCard } from '~/common/data';
import { IdeaItem } from './ExchangeItems';
import { WrapperContent } from '~/components/Content';
import CatBar from '~/components/CatBar';

export default function Solving() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState([...IdeaCard]);

  const itemsPerPage = 3;
  const currentItems = usePagination(data, currentPage, itemsPerPage);

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
            Mua - bán ý tưởng
          </h2>
          <div className="mx-auto my-5 w-full lg:w-[80%]">
            <div className="text-shadow line-clamp-3 text-xl text-white">
              Ý tưởng không chỉ để chia sẻ – mà còn để định giá và trao đổi.
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-5">
        <div className="flex gap-6">
          <CatBar data={[...IdeaCard]} setData={setData} />
          <div className="flex flex-1 flex-col px-4">
            <WrapperContent currentItems={currentItems}>
              {data.length === 0 ? (
                <div className="">Không có dữ liệu</div>
              ) : (
                currentItems.map((item) => {
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
            {data.length > 0 && (
              <PaginationBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={data.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
