import LoadingAni from '~/components/Animation/LoadingAni';

export default function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingAni>
        <span className="ml-4 text-xl text-gray-500">Đang tải dữ liệu...</span>
      </LoadingAni>
    </div>
  );
}
