export const usePagination = <T>(
  arrData: T[],
  currentPage: number,
  itemsPerPage: number,
) => {
  const indexStart = (currentPage - 1) * itemsPerPage;
  const indexEnd = indexStart + itemsPerPage;

  return arrData.slice(indexStart, indexEnd);
};
