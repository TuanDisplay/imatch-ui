import { ReactNode } from 'react';
import './index.css';

interface GlobalStylesProps {
  children: ReactNode;
}
export default function GlobalStyles({ children }: GlobalStylesProps) {
  return children;
}
