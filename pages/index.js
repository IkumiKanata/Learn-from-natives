import Head from 'next/head'
import React from 'react'
import InfoSection from "../components/InfoSection/InfoSection"
import Link from "next/link"
import {homeObjOne, homeObjTwo, homeObjThree, homeObjFour} from "./HomePage/Data"

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
