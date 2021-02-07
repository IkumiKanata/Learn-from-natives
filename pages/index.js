import Head from 'next/head'
import React from 'react'
import InfoSection from "../components/InfoSection/InfoSection"
import {homeObjOne, homeObjThree} from "../constants/DataForIndex"


export default function Home() {

  return (
    <>
{/* 
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />  
      </Head> */}
      <InfoSection {...homeObjOne}></InfoSection>
      <InfoSection {...homeObjThree}></InfoSection>

    </>    
  )
}  


