import React from 'react';
import MediaCard from './Card';

const CardList = (props) => {
  const {
    selectshow, videoIDs, videoTitles, 
    targetSubtitleLines, inputWord,
  } = props;
  if (!selectshow) return null;
  return (
    <>
      {videoIDs.map((ID, i) => {
        return (
          <MediaCard
            id={ID}
            title={videoTitles[i]}
            text={targetSubtitleLines[i]}
            inputWord={inputWord}
            key={i}
          />
        );
      })}
    </>
  );;
}

export default CardList;
