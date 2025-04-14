import { Link } from 'react-router-dom';
import clsx from 'clsx';
import './Button.css';

interface ButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  disable?: boolean;
  children: string;
  className?: string;
}

export default function Button({
  to,
  href,
  onClick,
  disable = false,
  children,
  className = '',
  ...passProps
}: ButtonProps) {
  let Comp: any = 'button';
  const props: any = {
    onClick,
    ...passProps,
  };

  if (disable) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  return (
    <Comp className={clsx('px-3 py-2', className)} {...props}>
      <span className="font-bold">{children}</span>
    </Comp>
  );
}
