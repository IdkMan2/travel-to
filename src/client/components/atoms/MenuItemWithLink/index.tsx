import MenuItem, {MenuItemProps} from '@material-ui/core/MenuItem';
import NextLink, {LinkProps} from 'next/link';
import React, {ForwardedRef, forwardRef, ReactNode} from 'react';

export type IMenuItemWithLinkProps = Exclude<Omit<MenuItemProps, 'button'>, LinkProps> & {
  button?: true;
  children: ReactNode;
} & LinkProps;

const MenuItemWithLink = forwardRef<HTMLLIElement, IMenuItemWithLinkProps>(
  (props: IMenuItemWithLinkProps, ref: ForwardedRef<HTMLLIElement>) => (
    <NextLink passHref {...props}>
      <MenuItem button={undefined} ref={ref} {...props}>
        {props.children}
      </MenuItem>
    </NextLink>
  )
);

export default MenuItemWithLink;
