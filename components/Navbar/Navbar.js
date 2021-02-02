import React, { useState,useEffect } from "react";
import {FaBars, FaTimes} from "react-icons/fa"
import Link from "next/link"



import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  // NavItemBtn,
  NavLinks,
  // NavBtnLink

} from "./Navbar.elements";
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => 
  import('./NoSSR'), {ssr:false});







const Navbar = () => {
const [click, setClick] = useState(false)


const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);


  return (

    <Nav>
      <NavbarContainer>
        <Link href="/" passHref>
          <NavLogo onClick={closeMobileMenu}  >
            <NavIcon/>RealBuilder
            
          </NavLogo>
        </Link>
        <MobileIcon onClick={handleClick} >
            {click ? <FaTimes />:<FaBars/>}
        </MobileIcon>
        <NavMenu onClick={handleClick} click={click}>
            <NavItem>
              <Link href="/" passHref>
                <NavLinks >Home</NavLinks>
              </Link> 
            </NavItem>
            <NavItem>
              <Link href="/about" passHref>
                <NavLinks onClick={closeMobileMenu}>about</NavLinks>
              </Link> 
            </NavItem>
            <DynamicComponent />
        </NavMenu>
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar

