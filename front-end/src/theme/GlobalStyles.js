import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

/* #root {
  min-height: 100vh;
} */

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  
  html {
    color: #040714;
    overflow: ${({ movieView }) => (movieView ? 'hidden' : 'visible')};
  }
  
  body {
    box-sizing: border-box;
    font-family: 'Poppins', 'sans-serif';
    background: #f3f3f3;
  }  
`;
