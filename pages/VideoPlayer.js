import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import VideoPlayer from "../components/PlayerSection/YouTubePlayer/YouTubePlayer";
import { CreateSubtitleForYoutube } from "../constants/URLs";
import VirtualizedList from "../components/PlayerSection/ScrollList/SubtitleScrollableList";
import styled from "styled-components"
import { Container } from "../globalStyles"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BackToSearch } from "../components/PlayerSection/BackToSearch.elements";

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
      <>
      <Head>
        <title>Learn From Natives | VidepPlayer</title>
        <link rel="icon" href="/favicon.ico" />  
      </Head>
      <div style={{background:"#101522"}}>

    <Container>
      <Link passHref href={{ pathname: '/VideoSelect', query: { keyword: title  } }}>
        <BackToSearch >
          
        <ArrowBackIcon> 

        </ArrowBackIcon>
          検索結果に戻る:  {title} 
        
        </BackToSearch>
      
      </Link>
       <Wrapper>
      <VideoPlayer
        videoId={videoId}
        title={title}
        fullSub={data1}
        targetSub={data2}   
        time={playerTime}
        />
      {showSubtitle ? <VirtualizedList sub={data2} timeHandler={(index) => {
        setPlayerTime(index)}} subtitleHandler={subtitleHandler} showSubtitle={showSubtitle} />:
        <VirtualizedList  sub={data1} timeHandler={(index) => {
          setPlayerTime(index)}}  subtitleHandler={subtitleHandler} showSubtitle={showSubtitle}/>}
       </Wrapper>
    </Container>

          </div>
          </>
  );
     
      
};

export default Comment;

