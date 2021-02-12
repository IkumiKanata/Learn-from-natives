import styled from "styled-components"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

export const ListWrapper = styled.div`
position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  margin-top: 20px;
  background-color:   #6495ed;
  border-radius:4px;
  border: solid 0.5px #6495ed;
  border: 1px solid hsla(0,0%,47.1%,.2);



`;

export const SubtitileSectionWrapper = styled.div`
justify-content: space-between;
  display: flex;
  margin: 1rem;

  @media screen and (max-width: 700px) {
    margin:0;
  }
`

export const ListPlayer = styled(FixedSizeList)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: solid 0.5px #6495ed ;
  border: 1px solid hsla(0,0%,47.1%,.2);
  background-color:  #BFD3F7;
  display:flex;

`;

export const List = styled(ListItem)`

`;
export const ListText = styled(ListItemText)`
padding-left:15px;
`;
export const ListTime = styled(ListItemText)`
padding-left:15px;

@media screen and (max-width: 500px
) {
  display:none;
}
`;

export const SubtitileSectionText = styled.p`
 text-align:center;
  height:40px;
  line-height:40px;
  color:#666666	
`

export const SubtitleButton = styled.button`
  background-color: #4b59f7;
  border-bottom: 5px solid #4b59f7;
  color:white;
  border-radius:4px;
  padding: 10px;
 

  @media screen and (max-width: 700px) {

    padding:0
    }

  

  & :hover {
  margin-top: 3px;
  color: white;
  background: #0467fb;
  border-bottom: 2px solid #0467fb;
  cursor:pointer
}
`