import React from 'react';
import MediaCard from './VideoCard';

const CardList = (props) => {
  const {
    selectshow, videoIDs, videoTitles, 
    targetSubtitleLines, inputWord,
  } = props;
  if (!selectshow) return null;
  return (
    <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center" }}>
      {videoIDs.map((ID, i) => {
        return (
          <MediaCard style={{width:"100%"}}
            id={ID}
            title={videoTitles[i]}
            text={targetSubtitleLines[i]}
            inputWord={inputWord}
            key={i}
          />
        );
      })}
    </div>
  );;
}

export default CardList;