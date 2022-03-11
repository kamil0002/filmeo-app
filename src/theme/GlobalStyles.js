import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  
  html {
    font-size: 62.5%;
    color: #040714;
  }
  
  body {
    box-sizing: border-box;
    font-family: 'Roboto', 'sans-serif';
    font-weight: 400;
    font-size: 1.6rem;
    background: #f3f3f3;
  }  
`;
