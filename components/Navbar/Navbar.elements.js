import styled from "styled-components"
import {Container} from "../../styles/globalStyles"
import {FaMagento} from "react-icons/fa"

export const Nav = styled.nav`
height:80px;
background: #000;
color: green;
display: flex;
justify-content: space-between;
align-items: center;
font-size:1.2rem;
position: sticky;
top:0;
z-index: 999;
`;

export const NavbarContainer = styled(Container)`
display: flex;
justify-content:space-between;
height:80px;

${Container} //other stuff imported from container
`;

export const NavLogo = styled.a`
color: green;
justify-self:flex-start;
cursor:pointer;
font-size:2rem;
display:flex;
align-items:center;
`;

export const NavIcon =  styled(FaMagento)`
margin-right: 0.5rem;
`;

export const MobileIcon = styled.div`
display:none;

@media screen and (max-width: 960px) {
  display: block;
  position: absolute;
  top: 0;
  right:0;
  transform: translate(-100%, 60%);
  font-size: 1.8rem;
  cursor: pointer;
}
`