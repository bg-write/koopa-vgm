declare namespace JSX {
  interface IntrinsicElements {
    'tableau-viz': {
      src: string;
      width?: string | number;
      height?: string | number;
      device?: string;
      hideTabs?: boolean;
      toolbar?: string;
      [key: string]: string | number | boolean | undefined;
    };
  }
}
