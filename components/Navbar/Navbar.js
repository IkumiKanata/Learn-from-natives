import React, { useState,useContext} from "react";
import {FaBars, FaTimes} from "react-icons/fa"
import Link from "next/link"
import { UserContext } from '../../lib/context';
import {signInWithGoogle, signInAnonymously, SignOut} from "../Loginout/logInOut"



import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavText,
  NavLinks,

} from "./Navbar.elements";
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => 
  import('./NoSSR'), {ssr:false});






const Navbar = () => {
const [click, setClick] = useState(false);
const {user} = useContext(UserContext);
const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);



  return (

    <Nav>
      <NavbarContainer>
        <Link href="/" passHref>
          <NavLogo onClick={closeMobileMenu}  >
            <NavIcon/>
            <NavText>
           Learn from Natives
            </NavText>
            
          </NavLogo>
        </Link>
        <MobileIcon onClick={handleClick} >
            {click ? <FaTimes />:<FaBars/>}
        </MobileIcon>
        <NavMenu onClick={handleClick} click={click}>
            {/* <NavItem>
              <Link href="/" passHref>
                <NavLinks >Home</NavLinks>
              </Link> 
            </NavItem> */}
            <NavItem>
              <Link href="/VideoSelect" passHref>
                <NavLinks onClick={closeMobileMenu}>単語検索</NavLinks>
              </Link> 
            </NavItem>
            {user && <NavItem>
              <Link href="/FavoriteWords" passHref>
                <NavLinks onClick={closeMobileMenu}>お気に入り単語</NavLinks>
              </Link> 
            </NavItem>}
            {!user && <NavItem>

                <NavLinks onClick={signInAnonymously}>ゲストログイン</NavLinks>
            </NavItem>}
            <DynamicComponent />
        </NavMenu>
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar

