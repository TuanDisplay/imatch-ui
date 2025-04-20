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
  href: string;
  label: string;
  icon: ReactNode;
}

export default function Menu({ children, links }: MenuProps) {
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
              className="absolute z-[9999] mt-5 w-48 origin-top-right rounded-md bg-white text-nowrap shadow-lg duration-300"
            >
              {links.map((link) => (
                <MenuItem key={link.href}>
                  <Button
                    href={link.href}
                    leftIcon={link.icon}
                    className="hover:bg-primary cursor-pointer justify-start px-6 py-2.5 hover:text-white"
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
