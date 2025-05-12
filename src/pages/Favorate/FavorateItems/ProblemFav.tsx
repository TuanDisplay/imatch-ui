import { ProblemCard } from '~/common/data';
import { WrapperContent } from '~/components/Content';
import { ProblemItem } from '~/pages/Problem/ProblemItems';

export default function ProFav() {
  return (
    <WrapperContent currentItems={ProblemCard}>
      {ProblemCard.length === 0 ? (
        <div className="">Không có dữ liệu</div>
      ) : (
        ProblemCard.map((item) => {
          return (
            <ProblemItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              category={item.category}
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
