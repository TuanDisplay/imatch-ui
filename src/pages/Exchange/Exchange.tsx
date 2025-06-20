import { useMemo, useState } from 'react';

import { MajorCat } from '~/common/data';
import { IdeaItem } from './ExchangeItems';
import { WrapperContent } from '~/components/Content';
import PaginationBar from '~/components/PaginationBar';
import CatBar from '~/components/CatBar';
import FilterBar from '~/layouts/components/Filter';
import { useIdeas } from '~/hooks/ApiQuery/useIdeaQuery';
import { mapIdea } from '~/utils/map/idea';
import { useDebounce } from '~/hooks/useDebounce';

export default function Exchange() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [catValue, setCatValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: allData, isLoading, error, refetch } = useIdeas({
    page: currentPage,
    industry: catValue,
    ideasname: debouncedSearch,
    price_tier: priceRange,
  });

  const data = useMemo(() => {
    return allData?.items ? allData?.items.map(mapIdea) : [];
  }, [allData?.items]);

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
          <CatBar
            CatItems={MajorCat}
            catValue={catValue}
            setCatValue={setCatValue}
          />
          <div className="flex flex-1 flex-col px-4">
            <div className="px-7">
              <FilterBar
                placeholder="Tìm kiểm ý tưởng..."
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
            <WrapperContent
              error={error}
              refetch={refetch}
              isLoading={isLoading}
            >
              {dataReal.length === 0 ? (
                <div className="text-center">Không có dữ liệu</div>
              ) : (
                dataReal.map((item, index) => {
                  return (
                    <IdeaItem
                      key={index}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      catValue={item.catValue}
                      title={item.title}
                      desc={item.desc}
                      price={item.price}
                      views={item.views}
                      publishDate={item.publishDate}
                    />
                  );
                })
              )}
            </WrapperContent>
            {dataReal.length > 0 && (
              <PaginationBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={allData?.total ? allData?.total : 0}
                itemsPerPage={allData?.limit ? allData?.limit : 0}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
