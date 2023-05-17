import { ButtonHTMLAttributes, FC } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  text: string;
  decoration?: Decoration;
};

import { Decoration, Size } from '@src/@types/common';

import * as ST from './styled';

const Button: FC<ButtonProps> = ({
  disabled,
  text,
  size = 'lg',
  children,
  onClick,
  decoration = 'default',
}) => {
  return (
    <ST.Button
      disabled={disabled}
      onClick={onClick}
      size={size}
      decoration={decoration}
    >
      {text}
      {children}
    </ST.Button>
  );
};

export { Button };
export type { ButtonProps };
