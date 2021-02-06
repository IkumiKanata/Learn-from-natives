import styled from "styled-components"
import {
  FooterContainer, 
  FooterSubscription, 
  FooterSubHeading, 
  FooterSubText
} 
from "./Footer.elements"


const Footer = () => {
  return (
    <FooterContainer>
      <FooterSubscription>
        <FooterSubHeading>
        </FooterSubHeading>
        <FooterSubText>
      <p>Learn from Natives 2021 ALL Rights Reserved</p>
        </FooterSubText>
      </FooterSubscription>
    </FooterContainer>
  )
}

export default Footer
