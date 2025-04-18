import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import './Button.css';

interface ButtonProps {
  to?: string;
  href?: string;
  type?: string;
  onClick?: () => void;
  disable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: string;
  className?: string;
}

export default function Button({
  to,
  href,
  type,
  onClick,
  disable = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
}: ButtonProps) {
  let Comp: any = 'button';
  const props: any = {
    type,
    onClick,
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
    <Comp
      className={clsx(
        'flex cursor-pointer items-center justify-center gap-2 duration-500',
        className,
      )}
      {...props}
    >
      {leftIcon && <span className="icon">{leftIcon}</span>}
      <span className="">{children}</span>
      {rightIcon && <span className="icon">{rightIcon}</span>}
    </Comp>
  );
}
