import PaginationBar from '~/components/PaginationBar';
import { MajorCat } from '~/common/data';
import { WrapperContent } from '~/components/Content';
import ExpertItem from './ExpertItems';
import CatBar from '~/components/CatBar';
import { useExpert } from '~/hooks/ApiQuery/useExpertQuery';
import { useMemo, useState } from 'react';
import { mapExpert } from '~/utils/map/expert';

export default function Expert() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [catValue, setCatValue] = useState<string>('');

  const { data: allData, isLoading, error, refetch } = useExpert({
    page: currentPage,
    industry: catValue,
  });

  const data = useMemo(() => {
    return allData?.items ? allData?.items.map(mapExpert) : [];
  }, [allData?.items]);

  return (
    <>
      <div className="relative flex justify-center">
        <img
          src="/banner/mucangchai2-banner.jpg"
          alt="expert-banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-1/2 container flex translate-y-[-50%] flex-col items-center text-center max-md:hidden">
          <h2 className="text-shadow bg-primary w-fit p-2 text-4xl font-bold text-white uppercase max-md:text-3xl">
            Chuyên gia tư vấn
          </h2>
          <div className="mx-auto my-5 w-full lg:w-[80%]">
            <div className="text-shadow line-clamp-3 text-xl text-white">
              Thảo luận cùng các chuyên gia để tìm ra giải pháp tối ưu!
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
            <WrapperContent
              error={error}
              refetch={refetch}
              isLoading={isLoading}
            >
              {data.length === 0 ? (
                <div className="text-center">Không có dữ liệu</div>
              ) : (
                data.map((item) => {
                  return (
                    <ExpertItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      mainMajor={'technology'}
                      author={item.author}
                      desc={item.desc}
                      views={item.views}
                      consultCount={item.consultCount}
                      rate={item.rate}
                    />
                  );
                })
              )}
            </WrapperContent>
            {data.length > 0 && (
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
