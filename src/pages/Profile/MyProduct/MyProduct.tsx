import MyIdeas from './MyIdeas';
import MyProblems from './MyProblems';
import MySolutions from './MySolutions';
import MyBoughtIdeas from './MyBoughtIdeas';

type typeValue =
  | 'postedIdea'
  | 'boughtIdea'
  | 'postedProblem'
  | 'postedSolution';

export default function MyProduct({
  selectedValue,
}: {
  selectedValue: typeValue | string;
}) {
  return (
    <>
      {selectedValue === 'postedIdea' && <MyIdeas />}
      {selectedValue === 'boughtIdea' && <MyBoughtIdeas />}
      {selectedValue === 'postedProblem' && <MyProblems />}
      {selectedValue === 'postedSolution' && <MySolutions />}
    </>
  );
}
