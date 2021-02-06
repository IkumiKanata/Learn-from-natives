import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import {ListWrapper, ListPlayer} from "./SubtitleScrollableList.elements"
import { YouTubePlayer } from "./YoutubePlayer.elements";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 500,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    
  },
}));

function RenderRow(props) { 
  const {data,index, style,} = props;
  const text = data.sub[index].text;
  const strToDecode = text;
  const parser = new DOMParser();
  const decodedText = parser.parseFromString(`<!doctype html><body>${strToDecode}`, 'text/html').body.textContent;

  return (
    <ListItem button style={style} key={index} onClick={() => {props.data.time(data.sub[index].start)}}>
      <PlayCircleOutlineRoundedIcon/>
      <ListItemText primary={decodedText}  />  
      {/* ここのListItemTextに受け取った別ファイルである親コンポーネントから受け取って、利用したい*/}
    </ListItem>
  );
}

RenderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  
};

export default function VirtualizedList(props) { //親コンポーネントからはここに
  const classes = useStyles();
  console.log(props.timeHandler)


  // if(props.targetSub) { //もし、渡されてきたpropsがtargetなら、targetをレンダー

    return (
      <ListWrapper>
        <h1>SUBTITLE</h1>
        {/* button here */}
        <button onClick={props.subtitleHandler
      }>{props.showSubtitle? "Show Full script":"Show target lines"}</button>
       
        <ListPlayer itemCount={props.sub.length} itemSize={66} itemData={{sub:props.sub, time:props.timeHandler}} height={600} > 
        {RenderRow} 
        </ListPlayer>
      </ListWrapper>


      // <div className={classes.root}> 
      //   <FixedSizeList height={400} width={"100%"} itemCount={200} itemCount={props.sub.length} itemData={{sub:props.sub, time:props.timeHandler}} >  
      // {RenderRow}
      //   </FixedSizeList>
      // </div>
    );
  
}


