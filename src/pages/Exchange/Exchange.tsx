import { useMemo, useState } from 'react';

import { usePagination } from '~/hooks/usePagination';
import { MajorCat } from '~/common/data';
import { IdeaItem } from './ExchangeItems';
import { WrapperContent } from '~/components/Content';
import { IIdeaDe } from '~/common/types/idea';
import PaginationBar from '~/components/PaginationBar';
import CatBar from '~/components/CatBar';
import FilterBar from '~/layouts/components/Filter';
import { useIdeas } from '~/hooks/ApiQuery/useIdeaQuery';

export default function Exchange() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataFilter, setDataFilter] = useState<IIdeaDe[]>([]);

  const itemsPerPage = 3;
  const currentItems = usePagination(dataFilter, currentPage, itemsPerPage);

  const { data } = useIdeas();
  const ideasQuery = useIdeas();

  const dataReal = useMemo(() => (Array.isArray(data) ? data : []), [data]);

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
          <CatBar CatItems={MajorCat} data={dataReal} setData={setDataFilter} />
          <div className="flex flex-1 flex-col px-4">
            <div className="px-7">
              <FilterBar
                dataReal={dataReal}
                setDataFilter={setDataFilter}
                placeholder="Tìm kiểm ý tưởng..."
              />
            </div>
            <WrapperContent queryResultObject={ideasQuery}>
              {dataFilter.length === 0 ? (
                <div className="text-center">Không có dữ liệu</div>
              ) : (
                currentItems.map((item, index) => {
                  return (
                    <IdeaItem
                      key={index}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      catValue={item.catValue}
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
            {dataFilter.length > 0 && (
              <PaginationBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={dataFilter.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
