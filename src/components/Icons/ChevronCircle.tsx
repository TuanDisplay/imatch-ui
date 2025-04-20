import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChevronCircleProps {
  type: string;
}

export default function ChevronCircle({ type }: ChevronCircleProps) {
  return (
    <div className="bg-primary rounded-full p-1">
      {type === 'left' ? <ChevronLeft /> : <ChevronRight />}
    </div>
  );
}
