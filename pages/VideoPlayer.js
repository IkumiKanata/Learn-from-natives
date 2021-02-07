import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import VideoPlayer from "../components/PlayerSection/YoutubePlayer";
import { CreateSubtitleForYoutube } from "../constants/URLs";
import VirtualizedList from "../components/PlayerSection/SubtitleScrollableList";
import styled from "styled-components"
import { Container } from "../globalStyles"

const Wrapper = styled.div`

@media screen and (min-width: 1025px) {
  display:flex;
  border-radius:4px;
}
`


const Comment = () => {
  const router = useRouter();

  const [data1, setData1] = useState({ hits: [] });
  const [data2, setData2] = useState({ hit2: [] });
  const [playerTime, setPlayerTime] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(true);




  const videoId = router.query.id;
  const title = router.query.inputWord;
  if(!router.query.inputWord) {
    return <h1 style={{margin:"0 auto"}}>No data received, go back to video select page</h1>
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = CreateSubtitleForYoutube(videoId);
      const result = await axios.get(url);
      setData1(result.data);
      const targetsub = result.data.filter((element) => {
        return (
          element.text.toLowerCase().includes(title) === true
        );
      });
      setData2(targetsub);
    };

    fetchData();
  }, []);

  const subtitleHandler = () => {
    setShowSubtitle(!showSubtitle)
  }

    return (

    <Container>
      <Link href={{ pathname: '/VideoSelect', query: { keyword: title  } }}><a>path</a></Link>
       {/* <button onClick={() => {
        setShowSubtitle(!showSubtitle)
      }}>{showSubtitle? "Show Full script":"Show target lines"}</button> */}
       <Wrapper>
      <VideoPlayer
        videoId={videoId}
        title={title}
        fullSub={data1}
        targetSub={data2}   
        time={playerTime}
      />
      {/* {showResults ? <h1>PHRASES WITH {title}</h1>:<h1>FULLSUB</h1>} */}
      {showSubtitle ? <VirtualizedList sub={data2} timeHandler={(index) => {
        setPlayerTime(index)}} subtitleHandler={subtitleHandler} showSubtitle={showSubtitle} />:
      <VirtualizedList  sub={data1} timeHandler={(index) => {
        setPlayerTime(index)}}  subtitleHandler={subtitleHandler} showSubtitle={showSubtitle}/>}
       </Wrapper>
    </Container>

  );
     
      
};

export default Comment;

