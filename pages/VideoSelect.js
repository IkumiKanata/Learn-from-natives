import Head from "next/head";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CreateSubtitleForYoutube, BESTAPI_TED } from "../constants/URLs";
import CardList from "../components/Cards/VideoCardList";
import DictionaryCard from "../components/Cards/DictionaryCard";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from "../globalStyles"
import SearchBar from "../components/SearchBar/SearchBar"
import { useRouter } from 'next/router'




export default function App(props) {

  const router = useRouter() //useEffect
  const [inputWord,setInputWord] = useState("");
  const [videoTitles,setVideoTitles] = useState([]);
  const [videoIDs,setVideoIDs] = useState([]); //holds youtubeID from tedAPI to use them in subtitleAPI and thumbnail
  const [subtitleDatas,setSubtitleDatas] = useState(null); //place subtitles for 3 videos
  const [targetSubtitleLines,setTargetSubtitleLines] = useState([]); 
  const [dictionaryData,setDictionaryData] = useState([]);
  const [selectshow,setSelectshow] = useState(false);
  const [loading,setLoading] = useState(false);




  const handleChange = (e) => {
    setInputWord(e.target.value.toLowerCase());
  };

  const getVideoIds = async (inputWord) => {
    const params = {
      params: {
        size: 3,
        text: inputWord,
        "rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    };
    const res = await axios.get(BESTAPI_TED, params);
    const videoIDList = res.data.map((element) => element.youTubeID);
    setVideoIDs(videoIDList);
    const videoTitleList = res.data.map((element) => element.name);
    setVideoTitles(videoTitleList);
    return  videoIDList;
  }

  const getSubTitleDataList = async (videoIDList) => {
    const resultList = await Promise.all(
      //promise.all promise aynsc await 非道j機処理-jsの処理を待たせる　promiseもwawaitみたいに待つよってやつで、allオプションは　　promiseの戻り値が配列としてリターンされるときに、使うことができる
      videoIDList.map(
        async (
          videoID //mapのなかasync await を使う
        ) => {
          const url = CreateSubtitleForYoutube(videoID);
          const response = await axios.get(url);
          return response;
        }
      )
    );
    const subtitleDataList = resultList.map((videodata) => videodata.data);
    setSubtitleDatas(subtitleDataList);
    return subtitleDataList;
  }

  const getDictionaryData = async (inputWord) => {
    try {
// テストする文
    // monthName=getMonthName(myMonth) // 関数は例外を投げることがある
    const res = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + inputWord); 
    setDictionaryData(res.data)
}
catch (e) {
    console.log("error") // 例外オブジェクトをエラー処理部分に渡す
    setDictionaryData(null)
}
  }

  const fetchAPI = async (e) => {
    e.preventDefault();
    if(!inputWord) {
      return null; 
    } //検索バーが空欄の時、関数を動かさない

    setLoading(true);
    try {
      
      const videoIDList = await getVideoIds(inputWord);
      const dictionaryData = await getDictionaryData(inputWord);
      const subtitleDataList = await getSubTitleDataList(videoIDList);
      let subtitleWord = [];
      for (let i = 0; i < subtitleDataList.length; i++) {
        subtitleWord.push(
          subtitleDataList[i].filter((element) => {
            return element.text.toLowerCase().includes(inputWord) === true;
          })
        );
      }
      setTargetSubtitleLines(subtitleWord);
      setSelectshow(true);
  } catch (error) {
    console.log("error", error)
    }
    setLoading(false);
  };


  const backToSelect = async () => {
    try {
      setLoading(true);


       const videoIDList = await getVideoIds(router.query.keyword);
      const dictionaryData = await getDictionaryData(router.query.keyword);
      const subtitleDataList = await getSubTitleDataList(videoIDList);
      let subtitleWord = [];
      for (let i = 0; i < subtitleDataList.length; i++) {
        subtitleWord.push(
          subtitleDataList[i].filter((element) => {
            return element.text.toLowerCase().includes(router.query.keyword) === true;
          })
        );
      }
      setTargetSubtitleLines(subtitleWord);
      setSelectshow(true);
  } catch (error) {
    console.log("error", error)
    }
    setLoading(false);  

  };   

  useEffect(() => {
      if (router.query.keyword) {
        backToSelect(); 
         };
  },[router.query.keyword])
  




    return (

    <>
      <Head>
        <title>Learn From Natives | VideoSelect</title>
        <link rel="icon" href="/favicon.ico" />  
      </Head>

      <div style={{background:"#101522"}}>  
      <Container >
        <div style={{minHeight:"70vh", display:"flex", flexDirection:"column"}}>
          {/* {keyword? <h1>{keyword}</h1>: null} */}
    
        <h1 style={{ textAlign:"center", color:"white"}}>単語を検索</h1>
        <SearchBar inputWord={inputWord} fetchAPI={fetchAPI} handleChange={handleChange} />
      
         {loading ? <CircularProgress style={{margin: "0 auto"}} />:
        <>
        <DictionaryCard 
        dictionaryData={dictionaryData}
        selectshow={selectshow}
        inputWord={inputWord || router.query.keyword}
        />
        <br />
          <CardList
            selectshow={selectshow}
            videoIDs={videoIDs}
            videoTitles={videoTitles}
            targetSubtitleLines={targetSubtitleLines}
            inputWord={inputWord || router.query.keyword}
            />
          </>}
        </div>
          </Container>
      </div>
     </>

    );
  
}
