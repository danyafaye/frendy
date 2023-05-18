import { FC, InputHTMLAttributes, ReactNode } from 'react';

import { Size } from '@src/@types/common';

import * as ST from './styled';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: Size;
  inputLabel?: string;
  icon?: ReactNode;
};

const Input: FC<InputProps> = ({ inputSize = 'lg', inputLabel, icon, ...props }) => {
  return (
    <>
      <ST.Label>
        {inputLabel}
        <ST.InputWrapper>
          <ST.Input
            inputSize={inputSize}
            {...props}
          />
          <ST.InputRightIcon>{icon}</ST.InputRightIcon>
        </ST.InputWrapper>
      </ST.Label>
    </>
  );
};

export { Input };
export type { InputProps };
