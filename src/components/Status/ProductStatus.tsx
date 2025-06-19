import Status from './Status';

export default function ProductStatus({
  isActive,
  isDelete,
}: {
  isActive: number | undefined;
  isDelete: number | undefined;
}) {
  return (
    <>
      {isActive === 0 && isDelete === 0 && (
        <Status pending>Đang kiểm duyệt</Status>
      )}
      {isActive === 1 && isDelete === 0 && (
        <Status accept>Phê duyệt sản phẩm</Status>
      )}
      {isActive === 1 && isDelete === 1 && (
        <Status accept>Từ chối sản phẩm</Status>
      )}
    </>
  );
}
