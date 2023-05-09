import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }

  *, *:before, *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: Inter;
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
  
  .modal_footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4rem;
  }
  
  #root {
    position: relative;
    z-index: 1;
  }
  #toast-root {
    position: relative;
    z-index: 2;
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
  
  .app-toast {
    position: fixed;
    z-index: 999999 !important;
  }
`;

export const App = styled.div`
  flex: 1 0 auto;
`;

export const AppWrapper = styled.div`
  display: flex;
  background-color: #f8f8f8;
  flex-direction: column;
  min-height: 100%;
`;
