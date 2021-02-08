import React from "react";
import PropTypes from 'prop-types';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import {
  ListWrapper, 
  ListPlayer, List, 
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

  return (
    <List button style={style} key={index} onClick={() => {props.data.time(data.sub[index].start)}}>
      <PlayCircleOutlineRoundedIcon/>
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


