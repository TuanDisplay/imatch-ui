import { IChildNode } from '~/common/types';
interface IOverview extends IChildNode {
  title: string;
  icon: string;
}

export default function Overview({ icon, title, children }: IOverview) {
  return (
    <div className="max-w-5xl min-w-4xl rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
