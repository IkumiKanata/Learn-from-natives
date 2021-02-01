import React, { useState } from "react";
import styled from "styled-components";
import {FaBars, FaTimes} from "react-icons/fa"
import Link from "next/link"
import {
  Nav, 
  NavbarContainer, 
  NavLogo, 
  NavIcon, 
  MobileIcon
} from "./Navbar.elements"




  const StyledLink = styled.a`
    padding: 0rem 2rem;
    color:green;
    `;

const Navbar = () => {
const [click, setClick] = useState(false)

const handleClick = () => setClick(!click)

  return (
    <Nav>
      <NavbarContainer>
      <div>
        <Link href="/" passHref>
          <div>
          <NavLogo>
            <NavIcon/>RealBuilder
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {click ? <FaTimes/> : <FaBars/>}
          </MobileIcon>

          </div>
          {/* <StyledLink>NXT</StyledLink> */}
        </Link>
      </div>
      <div>
      <Link href="/" passHref>
          <StyledLink>Home</StyledLink>
        </Link> 
      <Link href="/about" passHref>
          <StyledLink>about</StyledLink>
        </Link> 
      </div>
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar

