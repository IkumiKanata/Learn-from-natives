import React, {useState, useEffect} from 'react';
import Link from "next/link";
import { Button } from '../../styles/globalStyles';


import {
  NavItemBtn,
  NavBtnLink
} from "./Navbar.elements";


export default function HumbergerMenu() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const closeMobileMenu = () => setClick(false);


  const showButton = () => {
      if(window.innerWidth <= 960) {
        setButton(false)
      } else {
        setButton(true)
      }
    }
    
    useEffect(() => {
      showButton();
    }, []);
    
    
      window.addEventListener("resize", showButton);

    return (
      <NavItemBtn>
              {button? (
                <Link href="/" passHref>
                  <NavBtnLink >
                      <Button primary>
                        sign up
                      </Button>
                  </NavBtnLink>
                </Link>
              ) : 
              <Link href="/" passHref>
              <NavBtnLink>
                <Button onclick={closeMobileMenu} fontBig primary>
                  sign up
                </Button>
                </NavBtnLink>
              </Link>
                }
       </NavItemBtn>
    )
    


};
