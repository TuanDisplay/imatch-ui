interface IOverview {
  title: string;
  icon: string;
  desc: string | string[] | undefined;
}

export default function Overview({ icon, title, desc }: IOverview) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {Array.isArray(desc) ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {desc.length > 0 &&
            desc.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item}
                  className="max-h-[260px] rounded-xl shadow-md"
                />
              );
            })}
        </div>
      ) : (
        <p className="leading-relaxed whitespace-pre-line text-gray-700">
          {desc}
        </p>
      )}
    </div>
  );
}
