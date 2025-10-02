import { ComponentProps, ReactNode } from 'react';

declare module 'next/image' {
  interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  }

  interface ImageProps
    extends Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'> {
    src: string | StaticImageData;
    width?: number | `${number}`;
    height?: number | `${number}`;
    alt: string;
    fill?: boolean;
    loader?: (props: { src: string; width: number; quality?: number }) => string;
    quality?: number | `${number}`;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    placeholder?: 'empty' | `blur`;
    blurDataURL?: string;
    unoptimized?: boolean;
    onLoadingComplete?: (img: HTMLImageElement) => void;
    layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive' | 'raw';
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    lazyBoundary?: string;
    lazyRoot?: React.RefObject<HTMLElement> | null;
  }

  const Image: (props: ImageProps) => JSX.Element;
  export default Image;
}

declare module 'next/link' {
  import { LinkProps as NextLinkProps } from 'next/dist/client/link';

  export interface LinkProps extends Omit<NextLinkProps, 'as' | 'passHref' | 'children'> {
    children: ReactNode;
    as?: string;
    passHref?: boolean;
  }

  const Link: (props: LinkProps) => JSX.Element;
  export default Link;
}

// This ensures that JSX elements are properly typed
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
  }
}

export {};
