import { FC, InputHTMLAttributes, ReactNode } from 'react';

import { Decoration, Size } from '@src/@types/common';

import * as ST from './styled';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: Size;
  inputLabel?: string;
  icon?: ReactNode;
  decoration?: Decoration;
};

const Input: FC<InputProps> = ({
  inputSize = 'lg',
  inputLabel,
  icon,
  decoration = 'underlined',
  ...props
}) => {
  return (
    <>
      <ST.Label>
        {inputLabel}
        <ST.InputWrapper>
          <ST.Input
            inputSize={inputSize}
            decoration={decoration}
            {...props}
          />
          <ST.InputRightIcon decoration={decoration}>{icon}</ST.InputRightIcon>
        </ST.InputWrapper>
      </ST.Label>
    </>
  );
};

export { Input };
export type { InputProps };
