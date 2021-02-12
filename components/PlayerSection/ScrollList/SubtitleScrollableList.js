import React from "react";
import PropTypes from 'prop-types';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import {
  ListWrapper, 
  ListPlayer, 
  List, 
  ListTime,
  ListText, 
  SubtitleButton, 
  SubtitileSectionWrapper, 
  SubtitileSectionText
} from "./SubtitleScrollableList.elements"

function RenderRow(props) { 
  const {data,index, style,} = props;
  const text = data.sub[index].text;
  const strToDecode = text;
  const parser = new DOMParser();
  const decodedText = parser.parseFromString(`<!doctype html><body>${strToDecode}`, 'text/html').body.textContent;

  let startTime = props.data.sub[index].start;

  function TimeFormat(time) {   
    // Hours, minutes and seconds
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


  return (
    <List button style={style} key={index} onClick={() => {props.data.time(data.sub[index].start)}}>
      <PlayCircleOutlineRoundedIcon/>
      <ListTime	primary={TimeFormat(startTime)}  />  
      <ListText	primary={decodedText}  />  
    </List>
  );
}

RenderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  
};

export default function VirtualizedList(props) { 

    return (
      <ListWrapper>
        <SubtitileSectionWrapper>
        <SubtitileSectionText style={{fontSize:"20px", display:"flex",
}}>Subtitle section</SubtitileSectionText>
        <SubtitleButton onClick={props.subtitleHandler
      }>{props.showSubtitle? "Show Full script":"Show target lines"}</SubtitleButton>

        </SubtitileSectionWrapper>
       
        <ListPlayer itemCount={props.sub.length} itemSize={66} itemData={{sub:props.sub, time:props.timeHandler}} height={550} > 
        {RenderRow} 
        </ListPlayer>
      </ListWrapper>


    );
  
}


