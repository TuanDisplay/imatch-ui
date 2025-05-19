import { WrapperContent } from '~/components/Content';
import { useMyIdeas } from '~/hooks/ApiQuery/useIdeaQuery';
import { IdeaItem } from '~/pages/Exchange/ExchangeItems';

export default function MyIdeas() {
  const { data } = useMyIdeas();
  const myIdeaQuery = useMyIdeas();

  return (
    <div>
      <WrapperContent queryResultObject={myIdeaQuery}>
        {data?.length === 0 ? (
          <div className="text-center">Không có dữ liệu</div>
        ) : (
          data?.map((item) => {
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
              />
            );
          })
        )}
      </WrapperContent>
    </div>
  );
}
