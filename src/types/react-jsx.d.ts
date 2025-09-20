import 'react';

declare module 'react' {
  // This ensures that ReactNode is a valid JSX element
  type ReactText = string | number;
  type ReactChild = ReactElement | ReactText;
  type ReactFragment = {} | ReactNodeArray;
  
  interface ReactNodeArray extends Array<ReactNode> {}
  
  type ReactNode =
    | ReactChild
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;

  // This ensures that React elements are valid JSX elements
  interface Element extends ReactElement<any, any> {}
  
  // This ensures that class components are valid JSX elements
  interface ElementClass extends Component<any> {
    render(): ReactNode;
  }
}

// This makes the file a module
export {};
