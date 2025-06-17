import { ReactNode } from 'react';
import {
  Menu as Wrapper,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';

import Button from '~/components/Button';
import { ChevronUp } from 'lucide-react';
import clsx from 'clsx';

interface MenuProps {
  children: ReactNode;
  links: MenuItems[];
}

interface MenuItems {
  to: string;
  label: string;
  icon: ReactNode;
}

export default function NavMenu({ children, links }: MenuProps) {
  return (
    <Wrapper as="div">
      {({ open }) => {
        return (
          <>
            <MenuButton
              className={
                'hover:text-primary flex cursor-pointer items-center gap-2 duration-500'
              }
            >
              {children}
              <ChevronUp
                className={clsx('h-4 w-4', {
                  'rotate-180': open,
                })}
              />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="absolute z-[9999] mt-5 origin-top-right rounded-md bg-white text-nowrap shadow-lg"
            >
              {links.map((link) => (
                <MenuItem key={link.to}>
                  <Button
                    to={link.to}
                    leftIcon={link.icon}
                    className="hover:bg-primary cursor-pointer justify-start px-5 py-2.5 text-sm hover:text-white"
                  >
                    {link.label}
                  </Button>
                </MenuItem>
              ))}
            </MenuItems>
          </>
        );
      }}
    </Wrapper>
  );
}
