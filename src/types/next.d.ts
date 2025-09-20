import 'next';

declare module 'next' {
  export interface NextPageCustomProps {
    // Add any custom page props here
    [key: string]: any;
  }
}

declare module 'next/image' {
  import { ComponentProps } from 'react';
  
  interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  }

  interface ImageProps extends Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'> {
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

  const Image: React.ForwardRefExoticComponent<ImageProps>;
  export default Image;
}
