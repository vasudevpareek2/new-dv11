import 'react';

declare module 'react' {
  // This is a workaround for the 'ReactNode' not being a valid JSX element error
  // It ensures that ReactNode is properly typed as a valid JSX element
  type ReactText = string | number;
  type ReactChild = ReactElement | ReactText;

  interface ReactNodeArray extends Array<ReactNode> {}
  type ReactFragment = {} | ReactNodeArray;
  
  type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

  // Add any other React type augmentations here if needed
  
  // This helps with the 'Link' component type issues
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add any custom HTML attributes here if needed
    [key: string]: any;
  }
  
  // Add proper type for the Link component
  interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string;
    href?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
  }
}
