import React from 'react';
import { LinkProps as NextLinkProps } from 'next/link';

declare module 'next/image' {
  interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  }

  export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'> {
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

  const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;
  export default Image;
}

declare module 'next/link' {
  export interface LinkProps extends Omit<NextLinkProps, 'as' | 'passHref' | 'children'> {
    children: React.ReactNode;
    as?: string;
    passHref?: boolean;
    legacyBehavior?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }

  const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  export default Link;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow any HTML element
      [elemName: string]: any;
    }
  }
}
