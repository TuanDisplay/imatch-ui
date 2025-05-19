import { useMemo } from 'react';

import { WrapperContent } from '~/components/Content';
import { useFavList } from '~/hooks/ApiQuery/useFavQuery';
import { useProblem } from '~/hooks/ApiQuery/useProblemQuery';
import { ProblemItem } from '~/pages/Problem/ProblemItems';

export default function ProFav() {
  const { data: proList } = useProblem();
  const { data: favList } = useFavList();
  const query = useProblem();

  const favoriteSet = useMemo(() => {
    return new Set(favList?.map((fav) => fav.post_uuid));
  }, [favList]);

  const favorateList = useMemo(() => {
    if (!proList || !favList) return [];
    return proList.filter((idea) => favoriteSet.has(idea.id));
  }, [proList, favList, favoriteSet]);

  return (
    <WrapperContent queryResultObject={query}>
      {favorateList.length === 0 ? (
        <div className="text-center">Không có dữ liệu</div>
      ) : (
        favorateList.map((item, index) => {
          return (
            <ProblemItem
              key={index}
              id={item.id}
              imageUrl={item.imageUrl}
              catValue={item.catValue}
              title={item.title}
              desc={item.desc}
              price={item.price}
              submission={item.submission}
              publishDate={item.publishDate}
            />
          );
        })
      )}
    </WrapperContent>
  );
}
