import React from 'react';
import YouTube from 'react-youtube';
 
class Example extends React.Component {

  state = {
    time: 0
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.stopVideo();
    // event.target.seekTo(60,true)
  }
  _onChange(event) {
    // access to player in all event handlers via event.target
    // event.target.stopVideo();
    event.target.seekTo(state.time,true)
  }
  

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const {videoId} = this.props
    return (
      <>
      <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />
      
      </>
    )
  }
}

export default Example