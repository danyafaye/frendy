type Size = 'lg' | 'md' | 'sm';

type Decoration = 'filled' | 'underlined' | 'default';

type ErrorType = {
  status: number;
  data: {
    message: string;
  };
};

export type { Size, Decoration, ErrorType };
