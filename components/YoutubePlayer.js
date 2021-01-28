// // import React, { createRef } from 'react';
// // import YouTube from 'react-youtube';
 
// // class Example extends React.Component {

//   constructor(props) {
//     super(props)
//     this.ref = createRef()
//     //functional だとuseRef()
//     // onclick
//     // ref.curenttime = 10とかで時間を書き換える
//   // }
// //   _onReady(event) {
// //     // access to player in all event handlers via event.target
// //     // event.target.stopVideo();
// //     event.target.seekTo(60,true)
// //   }
// //   _onStateChange = (event) => {
// //     // access to player in all event handlers via event.target
// //     // event.target.stopVideo();
// //     event.target.seekTo(this.state.time,true)
// //   }
  

// //   render() {

// //     const opts = {
// //       height: '390',
// //       width: '640',
// //       playerVars: {
// //         // https://developers.google.com/youtube/player_parameters
// //         autoplay: 0,
// //       },
// //     };

// //     console.log(this.ref)
// //     const {videoId} = this.props
// //     return (
// //       <>
// //       <button onClick={this.clickHandler
// //       }>skip</button>
// //       <YouTube videoId={videoId} opts={opts} onReady={this._onReady} onStateChange={this._onStateChange} ref={this.ref}/>
      
// //       </>
// //     )
// //   }
// // }

// // export default Example

import React, { useRef,useState } from "react";
import YouTube from "react-youtube";
import VirtualizedList from "./List";
// ...

const VideoPlayer = (props) => {
  // Initialises a 'ref' for the player
  const playerRef = useRef(null);
  const [showResults, setShowResults] = useState(true)
  console.log(playerRef)

  // You can now access the player in your component
  // by using "playerRef.current.internalPlayer.API_METHOD"
  // ... See below for an example:

  // Our own custom function to pause the video
  const timeHandler = (index) => {
    playerRef.current.internalPlayer.seekTo(index,true); //ここに情報を渡して、
  };

  return (
    <>
      {/* Rest of your component */}
      <YouTube
        videoId={props.videoId}
        // Your other props
        ref={playerRef} // This sets the ref above to be linked to the player now
      />

      <button onClick={() => {
           setShowResults(!showResults)
         }}>{showResults? "Show Full script":"Show target lines"}</button>
      {showResults ? <h1>Phrases with {props.title}</h1>:<h1>FULLSUB</h1>}
      {showResults ? <VirtualizedList targetSub={props.targetSub} time={timeHandler} />:
      <VirtualizedList fullSub={props.fullSub} time={timeHandler}/>}

    </>
  );
};

export default VideoPlayer
