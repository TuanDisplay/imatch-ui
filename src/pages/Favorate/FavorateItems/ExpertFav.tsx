import { ExpertCard } from '~/common/data';
import { WrapperContent } from '~/components/Content';
import ExpertItem from '~/pages/Expert/ExpertItems';

export default function ExpertFav() {
  return (
    // <WrapperContent currentItems={ExpertCard}>
      ExpertCard.length === 0 ? (
        <div className="">Không có dữ liệu</div>
      ) : (
        ExpertCard.map((item) => {
          return (
            <ExpertItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              catValue={item.catValue}
              author={item.author}
              desc={item.desc}
              views={item.views}
              consultCount={item.consultCount}
              rate={item.rate}
            />
          );
        })
      )
    // </WrapperContent>
  );
}
