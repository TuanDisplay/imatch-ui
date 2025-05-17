import { useMemo } from 'react';
import { WrapperContent } from '~/components/Content';
import { useFavList } from '~/hooks/useApiQuery';
import { useIdeas } from '~/hooks/useApiQuery';
import { IdeaItem } from '~/pages/Exchange/ExchangeItems';

export default function IdeaFav() {
  const { data: ideaList } = useIdeas();
  const { data: favList } = useFavList();
  const query = useIdeas();

  const favoriteSet = useMemo(() => {
    return new Set(favList?.map((fav) => fav.post_uuid));
  }, [favList]);

  const favorateList = useMemo(() => {
    if (!ideaList || !favList) return [];
    return ideaList.filter((idea) => favoriteSet.has(idea.id));
  }, [ideaList, favList, favoriteSet]);

  return (
    <>
      <WrapperContent queryResultObject={query}>
        {favorateList.length === 0 ? (
          <div className="text-center">Không có dữ liệu</div>
        ) : (
          favorateList.map((item) => {
            return (
              <IdeaItem
                key={item.id}
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
    </>
  );
}
