import { WrapperContent } from '~/components/Content';
import { useMyProblem } from '~/hooks/ApiQuery/useProblemQuery';
import { ProblemItem } from '~/pages/Problem/ProblemItems';

export default function MyProblems() {
  const { data } = useMyProblem();
  const myProQuery = useMyProblem();

  return (
    <div>
      <WrapperContent queryResultObject={myProQuery}>
        {data?.length === 0 ? (
          <div className="text-center">Không có dữ liệu</div>
        ) : (
          data?.map((item) => {
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
              />
            );
          })
        )}
      </WrapperContent>
    </div>
  );
}
