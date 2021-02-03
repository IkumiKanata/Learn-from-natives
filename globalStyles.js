import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
 } 
`;
// const GlobalStyle = createGlobalStyle`
// html,
// body {
//   padding: 0;
//   margin: 0;
//   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
//     Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
//   line-height: 1.6;
//   font-size: 18px;
// }

// * {
//   box-sizing: border-box;
// }

/* a {
  color: green;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    color: red;
}

    } */

// img {
//   max-width: 100%;
//   display: block;
// }
// `;

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
`;

export const Button =styled.button`
border-radius: 4px;
background: ${({primary}) => (primary ? "#4b59f7": "#0467fb")};
white-space: nowrap;
padding: ${({big}) => (big? "12px 64px":"10px 20px" )};
color:white;
font-size: ${({fontBig}) => (fontBig? "20px": "16px")};
outline: none;
border:none;
cursor: pointer;

&:hover {
  transition: all 0.3s ease-out;
  background: #fff;
  background-color: ${({primary}) => (primary? "#0467fb" :  "#4b59f7")};  
}

@media screen and (max-width: 960px) {
  width: 100%;
}
`

export default GlobalStyle