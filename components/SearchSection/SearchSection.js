import React from 'react'
import Link from "next/link"
import {Container, Button}  from "../../globalStyles"
import {
  InfoSec, 
  InfoRow, 
  InfoColumn, 
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img
} from "./InfoSection.elements"

 const SearchSection = ({
  primary,
  lightBg,
  imgStart,
  topLine, 
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  start
 }) => {
  return (
    <>
         <InfoSec lightBg={lightBg}>
        <Container>
            <InfoRow imgStart={imgStart}>
              <InfoColumn>
                <TextWrapper>
                  <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                  <Heading lightText={lightText}>{headline}</Heading>
                  <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                  <Link passHref href="/VideoSelect">
                    <Button big fontBig primary={primary}>{buttonLabel}</Button>
                  </Link>
                  
                </TextWrapper>
              </InfoColumn>
              <InfoColumn>
                <ImgWrapper start={start}>
                  <Img src={img} alt={alt} />
                </ImgWrapper>
              </InfoColumn>
            </InfoRow>
        </Container>
         </InfoSec>
    </>
  )
}

export default SearchSection
