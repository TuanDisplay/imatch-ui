import { ReactNode } from 'react';
import {
  Menu as Wrapper,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import Button from '~/components/Button';

interface MenuProps {
  children: ReactNode;
  links: MenuItems[];
}

interface MenuItems {
  href: string;
  label: string;
}

export default function Menu({ children, links }: MenuProps) {
  return (
    <Wrapper>
      <MenuButton className={'cursor-pointer'}>{children}</MenuButton>
      <MenuItems anchor="bottom" className="mt-2 flex flex-col bg-white">
        {links.map((link) => (
          <MenuItem key={link.href}>
            <Button
              href={link.href}
              className="block cursor-pointer data-[focus]:bg-blue-100"
            >
              {link.label}
            </Button>
          </MenuItem>
        ))}
      </MenuItems>
    </Wrapper>
  );
}
