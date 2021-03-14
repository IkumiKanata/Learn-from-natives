import Layout from "../components/Layout"
import GlobalStyle from "../globalStyles"
import { UserContext } from '../lib/context';
import { auth, firestore } from '../lib/firebase';
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth"
import { Toaster } from 'react-hot-toast';


export default function MyApp({ Component, pageProps }) {

  const [user] = useAuthState(auth);
  return (
    <>
    <GlobalStyle/>
    <UserContext.Provider value={{user}}>
 <Layout>
  <Component {...pageProps}/>
 </Layout>
 <Toaster />
 </UserContext.Provider>

    </>
  )
}



