import MaterialUiLink, {LinkProps as MaterialUiLinkProps} from '@material-ui/core/Link';
import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import React, {ForwardedRef, forwardRef} from 'react';

const MaterialUiLinkWithRef = forwardRef((props: MaterialUiLinkProps, ref: ForwardedRef<HTMLLinkElement>) => (
  <MaterialUiLink ref={ref} {...props} />
));

export interface ILinkProps extends Omit<MaterialUiLinkProps, 'ref'> {
  href: string;
  NextLinkProps?: Omit<NextLinkProps, 'passHref' | 'href'>;
}

function Link(props: ILinkProps) {
  const {NextLinkProps, href, ...MaterialUiLinkProps} = props;

  return (
    <NextLink passHref href={href} {...NextLinkProps}>
      <MaterialUiLinkWithRef {...MaterialUiLinkProps} />
    </NextLink>
  );
}

export default Link;
