import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Montserrat, sans-serif;
    font-size: 18px;
    background-color: #f0f0f0;
    color: #333;
  }
`;

export default GlobalStyle;
