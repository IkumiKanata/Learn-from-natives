import styled from "styled-components"

const FooterSection = styled.div`
  background: #000;
  color: green;
  height: 60px;
  display: flex;
  justify-content: center;
  `


const Footer = () => {
  return (
    <FooterSection>

      <p>Next 2021 ALL Rights Reserved</p>
    </FooterSection>
  )
}

export default Footer
