import styled from "styled-components";
import YouTube from "react-youtube";




export const VidepWrapper = styled.div`
position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: auto;
  margin-top: 20px;
  margin-bottom: 50px;

`;

export const YouTubePlayer = styled(YouTube)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;


`;