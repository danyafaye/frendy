import styled, {css} from "styled-components";

import {ButtonProps} from "@components/Button/Button";


export const Button = styled.button<Partial<ButtonProps>>`
  background:none;
  ${(props) => {
    switch (props.size) {
      case "lg":
        return css`
          font-size: 30px;
          font-weight: 300;
          color: #222222;
          transition: all .3s ease-in-out;
          &:hover{
            color: #82616C;
          }
        `;
      case "sm":
        return css`
        `;
      case "md":
        return css`
        `;
      default:
        return css`
          background-color: white;
          color: black;
        `;
    }
  }}
`
