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
    color: #040714;
  }
  
  body {
    box-sizing: border-box;
    font-family: 'Poppins', 'sans-serif';
    background: #f3f3f3;
  }  
`;
