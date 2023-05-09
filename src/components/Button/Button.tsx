import {ButtonHTMLAttributes, FC} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  text: string;
}

import {ButtonSize} from "@src/@types/common";

import * as ST from './styled';

const Button: FC<ButtonProps> = ({disabled, text, size = 'lg', children, onClick}) => {
  return (
    <ST.Button
      disabled={disabled}
      onClick={onClick}
      size={size}>
      {text}
      {children}
    </ST.Button>
  );
};

export {Button};
export type {ButtonProps}
