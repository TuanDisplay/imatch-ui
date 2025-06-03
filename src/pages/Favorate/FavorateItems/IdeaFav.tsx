import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { IIdeaFavCard } from '~/common/types/idea';
import LoadingAni from '~/components/Animation/LoadingAni';
import { WrapperContent } from '~/components/Content';
import { useFavIdeasScroll } from '~/hooks/ApiQuery/useIdeaQuery';
import { IdeaItem } from '~/pages/Exchange/ExchangeItems';

export default function IdeaFav() {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFavIdeasScroll();

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
          {data?.pages.map((page: IIdeaFavCard[]) => {
            return page?.map((item: IIdeaFavCard, index) => {
              const isLast = page.length === index + 1;
              return (
                <IdeaItem
                  key={item.id}
                  id={item.post_id}
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
  );
}
