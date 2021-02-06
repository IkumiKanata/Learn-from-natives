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
  margin-bottom: 50px;
  
`;

export const ListPlayer = styled(FixedSizeList)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  
/* 
  @media screen and (min-width: 1025px) {
    width:50%
  } */
`;