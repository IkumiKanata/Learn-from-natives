import styled, { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: green;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    color: red;
}

}

img {
  max-width: 100%;
  display: block;
}
`;

export const Container = styled.div`
z-index:1;
width:100%;
max-width:1300px;
margin-right: auto;
margin-left: auto;
padding-right: 50px;
padding-left: 50px;

@media screen and (max-width:991px) {
  padding-right: 30px;
  padding-left:30px;
}



`

export default GlobalStyle