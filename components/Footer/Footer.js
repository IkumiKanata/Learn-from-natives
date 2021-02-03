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
          Join our exclusive membership to receive the latest news and trends
        </FooterSubHeading>
        <FooterSubText>
        You can unsubscribe at any time
      <p>Next 2021 ALL Rights Reserved</p>
        </FooterSubText>
      </FooterSubscription>
    </FooterContainer>
  )
}

export default Footer
