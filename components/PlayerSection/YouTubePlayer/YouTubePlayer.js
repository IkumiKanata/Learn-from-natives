import React, { useRef,useState, useEffect } from "react";
import YouTube from "react-youtube";
import {VidepWrapper, YouTubePlayer} from "./YouTubePlayer.elements"

const VideoPlayer = (props) => {
  // Initialises a 'ref' for the player
  const playerRef = useRef(null);
  console.log(playerRef)
  console.log(props.time)

  
    // You can now access the player in your component
    // by using "playerRef.current.internalPlayer.API_METHOD"
  useEffect(() => {
    // 初回描画後と、indexが変わったときに実行される
    playerRef.current.internalPlayer.seekTo(props.time, true)
  }, [props.time])

  // ... See below for an example:



  // Our own custom function to pause the video
  // const timeHandler = (index) => {
  //   playerRef.current.internalPlayer.seekTo(index,true); //ここに情報を渡して、
  // };

  return (
    <>
      {/* Rest of your component */}
      <VidepWrapper>
        <YouTubePlayer
          videoId={props.videoId}
          // Your other props
          ref={playerRef} // This sets the ref above to be linked to the player now
        />
        
      </VidepWrapper>

    </>
  );
};

export default VideoPlayer


