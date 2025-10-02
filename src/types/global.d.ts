import 'react';
import 'next';

// This ensures that JSX is properly typed
declare global {
  // This extends the global JSX namespace
  namespace JSX {
    // This defines the type of any HTML element
    interface IntrinsicElements {
      [elemName: string]: any;
    }

    // This ensures that React elements are valid JSX elements
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
  }

  // Global type for process.env
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      // Add other environment variables here
    }
  }
}

// This makes the file a module
{
}
