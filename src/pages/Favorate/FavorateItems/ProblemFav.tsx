import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import LoadingAni from '~/components/Animation/LoadingAni';
import { IProCard } from '~/common/types/problem';
import { WrapperContent } from '~/components/Content';
import { useFavProScroll } from '~/hooks/ApiQuery/useProblemQuery';
import { ProblemItem } from '~/pages/Problem/ProblemItems';

export default function ProFav() {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFavProScroll();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <WrapperContent error={error} refetch={refetch} isLoading={isLoading}>
      {data?.pages.every((page) => Array.isArray(page) && page.length === 0) ? (
        <div className="text-center">Không có dữ liệu</div>
      ) : (
        <>
          {data?.pages.map((page: IProCard[]) => {
            return page?.map((item: IProCard, index) => {
              const isLast = page.length === index + 1;
              return (
                <ProblemItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  catValue={item.catValue}
                  title={item.title}
                  desc={item.desc}
                  price={item.price}
                  submission={item.submission}
                  publishDate={item.publishDate}
                  innerRef={isLast ? ref : null}
                />
              );
            });
          })}
          {isFetchingNextPage && (
            <div className="relative mt-5 h-5">
              <LoadingAni>
                <span className="ml-4 text-sm text-gray-500">
                  Đang tải dữ liệu...
                </span>
              </LoadingAni>
            </div>
          )}
        </>
      )}
    </WrapperContent>
  );
}
