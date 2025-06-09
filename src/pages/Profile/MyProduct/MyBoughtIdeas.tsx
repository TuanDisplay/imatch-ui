import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { IIdeaCard } from '~/common/types/idea';
import LoadingAni from '~/components/Animation/LoadingAni';
import { WrapperContent } from '~/components/Content';
import { useBuyIdeasScroll } from '~/hooks/ApiQuery/useIdeaQuery';
import { IdeaItem } from '~/pages/Exchange/ExchangeItems';

export default function MyBoughtIdeas() {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useBuyIdeasScroll();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <WrapperContent error={error} refetch={refetch} isLoading={isLoading}>
        {data?.pages.every(
          (page) => Array.isArray(page) && page.length === 0,
        ) ? (
          <div className="text-center">Không có dữ liệu</div>
        ) : (
          <>
            {data?.pages.map((page: IIdeaCard[]) => {
              return page?.map((item: IIdeaCard, index) => {
                const isLast = page.length === index + 1 && page.length > 2;
                return (
                  <IdeaItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    catValue={item.catValue}
                    author={item.author}
                    title={item.title}
                    desc={item.desc}
                    views={item.views}
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
    </div>
  );
}
