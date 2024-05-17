export type Source = {
  pageContent: string;
  metadata: {
    loc: {
      lines: {
        from: number;
        to: number;
      };
    };
  };
};
