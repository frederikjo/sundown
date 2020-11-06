import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
	min-height: 100%;
	font-family: Arial, Helvetica, sans-serif;
	margin: auto;
	width: 70vw;
  }

  main {
	  padding: 30px 0;
  }

  a {
	  text-decoration: none;
  }
`;
