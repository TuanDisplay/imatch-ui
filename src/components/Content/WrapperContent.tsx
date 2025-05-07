import { ReactNode, useEffect, useState } from 'react';

interface IWrapperContent {
  currentItems: object[];
  children: ReactNode;
}

export default function WrapperContent({
  currentItems,
  children,
}: IWrapperContent) {
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentItems]);

  return (
    <div className="relative h-[95vh] w-full overflow-hidden overflow-y-auto py-2">
      {isLoading ? (
        <div className="absolute top-1/2 w-full translate-y-[-50%] text-center">
          Đang tải dữ liệu...
        </div>
      ) : (
        <div className="space-y-6">{children}</div>
      )}
    </div>
  );
}
