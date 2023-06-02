import styled, { createGlobalStyle } from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const GlobalStyles = createGlobalStyle`
  .p-image-preview-container:hover > .p-image-preview-indicator{
    background: none;
  }
  .p-image-preview-indicator .p-icon{
    display:none;
  }
  .p-image-preview {
    max-width: 600px;
    max-height: 600px;
  }
  * {
    padding: 0;
    margin: 0;
    border: 0;
    scrollbar-color: #b0babf rgba(60,70,78,.05);
    scrollbar-width: thin;
  }

  *, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: Inter;
    color: ${COLORS.$gray90};
  }
  :focus, :active {
    outline: none;
  }
  a:focus, a:active {
    outline: none;
  }
  nav, footer, header, aside {
    display: block;
  }
  html, body, #root {
    height: 100%;
    width: 100%;
  }
  
  #root {
    position: relative;
    z-index: 1;
  }
  input::-ms-clear {
    display: none;
  }
  input, button, textarea {
    font-family: inherit;
  }
  button {
    cursor: pointer;
  }
  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  a, a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
`;

export const App = styled.div`
  flex: 1 0 auto;
  margin-top: 68px;
  height: calc(100% - 68px);
  overflow: hidden;
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
