import Head from 'next/head'
import React from 'react'
import InfoSection from "../components/InfoSection/InfoSection"
import {homeObjOne,homeObjTwo, homeObjThree} from "../constants/DataForIndex"


export default function Home() {

  return (
    <>
      <Head>
        <title>Learn From Natives</title>
        <link rel="icon" href="/favicon.ico" />  
      </Head>
      <InfoSection {...homeObjOne}></InfoSection>
      <InfoSection {...homeObjThree}></InfoSection>
      <InfoSection {...homeObjTwo}></InfoSection>
    </>    
  )
}  


