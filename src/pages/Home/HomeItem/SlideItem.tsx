interface SlideItemProps {
  imageUrl: string;
  name: string;
  major: string;
}

export default function SlideItem({ imageUrl, name, major }: SlideItemProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="h-[250px] w-[250px] overflow-hidden rounded-full">
        <img src={imageUrl} alt={name} className="bg-cover" />
      </div>
      <div className="mt-2 space-y-1 text-center">
        <h3 className="text-skyBlue-900 font-bold">{name}</h3>
        <p className="text-skyBlue-900 font-light">{major}</p>
      </div>
    </div>
  );
}
