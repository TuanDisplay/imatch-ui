import { IdeaCard } from '~/common/data';
import { WrapperContent } from '~/components/Content';
import { IdeaItem } from '~/pages/Exchange/ExchangeItems';

export default function IdeaFav() {
  return (
    // <WrapperContent currentItems={IdeaCard}>
      IdeaCard.length === 0 ? (
        <div className="">Không có dữ liệu</div>
      ) : (
        IdeaCard.map((item) => {
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
      )
    // </WrapperContent>
  );
}
