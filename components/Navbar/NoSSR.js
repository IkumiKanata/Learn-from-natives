import React, {useState, useEffect, useContext} from 'react';
import Link from "next/link";
import { Button } from '../../globalStyles';
import { UserContext } from '../../lib/context';
import {signInWithGoogle, signInAnonymously, SignOut} from "../Loginout/logInOut"



import {
  NavItemBtn,
  NavBtnLink
} from "./Navbar.elements";


export default function NavButton() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const closeMobileMenu = () => setClick(false);
  const {user, username} = useContext(UserContext);

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
                  <NavBtnLink >
                      <Button onClick={user? SignOut: signInWithGoogle} primary >
                        {user ? "サインアウト" : "登録/ログイン"}
                      </Button>
                  </NavBtnLink>
              ) : 
              <NavBtnLink>
                <Button onClick={user? SignOut: signInWithGoogle} fontBig primary>
                {user ? "サインアウト" : "登録/ログイン"}
                </Button>
                </NavBtnLink>
                }
       </NavItemBtn>
    )
    


};
