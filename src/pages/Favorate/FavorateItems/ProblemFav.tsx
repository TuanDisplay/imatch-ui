import { ProblemCard } from '~/common/data';
import { useProFav } from '~/hooks/ApiQuery/useFavQuery';
// import { WrapperContent } from '~/components/Content';
import { ProblemItem } from '~/pages/Problem/ProblemItems';

export default function ProFav() {
  const { data } = useProFav('ideas');

  console.log('Data: ' + JSON.stringify(data));

  return (
    // <WrapperContent currentItems={ProblemCard}>
    ProblemCard.length === 0 ? (
      <div className="">Không có dữ liệu</div>
    ) : (
      ProblemCard.map((item, index) => {
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
    )
    // </WrapperContent>
  );
}
