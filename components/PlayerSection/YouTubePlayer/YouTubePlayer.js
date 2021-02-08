import React, { useRef,useEffect } from "react";
import {VidepWrapper, YouTubePlayer} from "./YouTubePlayer.elements"

const VideoPlayer = (props) => {
  // Initialises a 'ref' for the player
  const playerRef = useRef(null);

  
    // You can now access the player in your component
    // by using "playerRef.current.internalPlayer.API_METHOD"
  useEffect(() => {
    // 初回描画後と、indexが変わったときに実行される
    playerRef.current.internalPlayer.seekTo(props.time, true)
  }, [props.time])


  return (
    <>
      <VidepWrapper>
        <YouTubePlayer
          videoId={props.videoId}
          ref={playerRef} // This sets the ref above to be linked to the player now
        />
      </VidepWrapper>
    </>
  );
};

export default VideoPlayer


