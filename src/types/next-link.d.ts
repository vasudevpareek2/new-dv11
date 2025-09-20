import { ComponentProps, ReactNode } from 'react';

declare module 'next/link' {
  import { LinkProps as NextLinkProps } from 'next/dist/client/link';
  
  export interface LinkProps extends Omit<NextLinkProps, 'as' | 'passHref' | 'children'> {
    children: ReactNode;
    as?: string;
    passHref?: boolean;
  }
  
  declare const Link: {
    (props: LinkProps): JSX.Element;
    displayName?: string;
  };
  
  export default Link;
}
