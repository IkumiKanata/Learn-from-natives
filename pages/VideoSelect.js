import Head from "next/head";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CreateSubtitleForYoutube, BESTAPI_TED } from "../constants/URLs";
import CardList from "../components/VideoSelectCards/VideoCardList";
import DictionaryCard from "../components/VideoSelectCards/DictionaryCard";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Button } from "../globalStyles"
import SearchBar from "../components/SearchSection/SearchSection"
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
//   const [keyword,setKeyword] = useState("");

// const keywordWrap = router.query.keyword;
//   setKeyword(keywordWrap);

console.log(router.query.keyword)
const keyword = router.query.keyword;


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
    console.log(videoIDList[1]); //stateにアクセスして値を取得できているので、上のsetstateは完了している
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
    console.log(res.data[0])
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

       const videoIDList = await getVideoIds();
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
    useEffect(() => {
     if (router.query.keyword) {
      console.log(router.query.keyword);
      const f = async () => {
        
              const keyword =  router.query.keyword;
              console.log(keyword)

              const unko = await setInputWord(prev => {
                return keyword});
                console.log(inputWord) //setInputWordが完了していない
              await backToSelect(); //ここが上の処理が終わってから走るようにしたい
        
      };
      f();
    }
    }, [router.query.keyword]);

  // useEffect(() => {
  //   ()=> {backToSelect};
  
  // },[keyword]);


  
  

    // const {
    //   selectshow,
    //   videoIDs,
    //   videoTitles,
    //   targetSubtitleLines,
    //   inputWord,
    //   dictionaryData,


    // } = this.state;
    return (

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
        inputWord={inputWord}
        />
        <br />
          <CardList
            selectshow={selectshow}
            videoIDs={videoIDs}
            videoTitles={videoTitles}
            targetSubtitleLines={targetSubtitleLines}
            inputWord={inputWord}
            />
          </>}
        </div>
          </Container>

      </div>

    );
  
}
// export default class App extends Component {
//   state = {
//     inputWord: "",
//     videoTitles: [],
//     videoIDs: [], //holds youtubeID from tedAPI to use them in subtitleAPI and thumbnail
//     subtitFleDatas: null, //place subtitles for 3 videos
//     targetSubtitleLines: [], //
//     dictionaryData: [],
//     selectshow: false,
//     loading: false,
//   };


//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value.toLowerCase() });
//   };

//   getVideoIds = async (inputWord) => {
//     const params = {
//       params: {
//         size: 5,
//         text: inputWord,
//         "rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
//       },
//     };
//     const res = await axios.get(BESTAPI_TED, params);
//     const videoIDList = res.data.map((element) => element.youTubeID);
//     this.setState({
//       videoIDs: videoIDList,
//     });
//     const videoTitleList = res.data.map((element) => element.name);
//     this.setState({
//       videoTitles: videoTitleList,
//     });
//     console.log(videoIDList[1]); //stateにアクセスして値を取得できているので、上のsetstateは完了している
//     return  videoIDList;
//   }

//   getSubTitleDataList = async (videoIDList) => {
//     const resultList = await Promise.all(
//       //promise.all promise aynsc await 非道j機処理-jsの処理を待たせる　promiseもwawaitみたいに待つよってやつで、allオプションは　　promiseの戻り値が配列としてリターンされるときに、使うことができる
//       videoIDList.map(
//         async (
//           videoID //mapのなかasync await を使う
//         ) => {
//           const url = CreateSubtitleForYoutube(videoID);
//           const response = await axios.get(url);
//           return response;
//         }
//       )
//     );
//     const subtitleDataList = resultList.map((videodata) => videodata.data);
//     this.setState({
//       subtitleDatas: subtitleDataList,
//     });
//     return subtitleDataList;
//   }

//   getDictionaryData = async (inputWord) => {
//     try {
// // テストする文
//     // monthName=getMonthName(myMonth) // 関数は例外を投げることがある
//     const res = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + inputWord); 
//     console.log(res.data[0])
//     this.setState({
//       dictionaryData: res.data
//     })
// }
// catch (e) {
//     console.log("error") // 例外オブジェクトをエラー処理部分に渡す
//     this.setState({
//       dictionaryData: null
//     })
// }
//   }

//   fetchAPI = async (e) => {
//     const { inputWord } = this.state;
//     e.preventDefault();
//     if(!this.state.inputWord) {
//       return null; 
//     } //検索バーが空欄の時、関数を動かさない

//     this.setState({loading:true})
//     try {
      
//       const videoIDList = await this.getVideoIds(inputWord);
//       const dictionaryData = await this.getDictionaryData(inputWord);
//       const subtitleDataList = await this.getSubTitleDataList(videoIDList);
//       let subtitleWord = [];
//       for (let i = 0; i < subtitleDataList.length; i++) {
//         subtitleWord.push(
//           subtitleDataList[i].filter((element) => {
//             return element.text.toLowerCase().includes(inputWord) === true;
//           })
//         );
//       }
//       this.setState({ targetSubtitleLines: subtitleWord });
//       this.setState({ selectshow: true });
//   } catch (error) {
//     console.log("error", error)
//     }
//     this.setState({loading:false})
//   };



//   render() {
//     const {
//       selectshow,
//       videoIDs,
//       videoTitles,
//       targetSubtitleLines,
//       inputWord,
//       dictionaryData,


//     } = this.state;
//     return (

//       <div style={{background:"#101522"}}>  
//       <Container >
//         <div style={{minHeight:"70vh", display:"flex", flexDirection:"column"}}>
    
//         <h1 style={{ textAlign:"center", color:"white"}}>単語を検索</h1>
//         {/* <h1>{router.query}</h1> */}
//         <SearchBar inputWord={this.state.inputWord} fetchAPI={this.fetchAPI} handleChange={this.handleChange} />
      
//          { this.state.loading ? <CircularProgress style={{margin: "0 auto"}} />:
//         <>
//         <DictionaryCard 
//         dictionaryData={dictionaryData}
//         selectshow={selectshow}
//         inputWord={inputWord}
//         />
//         <br />
//           <CardList
//             selectshow={selectshow}
//             videoIDs={videoIDs}
//             videoTitles={videoTitles}
//             targetSubtitleLines={targetSubtitleLines}
//             inputWord={inputWord}
//             />
//           </>}
//         </div>
//           </Container>

//       </div>

//     );
//   }
// }