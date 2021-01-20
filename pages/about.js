import Head from 'next/head'

import axios from "axios";
import React, {Component} from "react"; 
import Link from 'next/link';
import Card from "./Card";
import VirtualizedList from "./List";

export default class App extends Component {
  state={
     inputWord: '',
     videoTitles: [],
     videoIDs: [], //holds youtubeID from tedAPI to use them in subtitleAPI and thumbnail 
     subtitleDatas: null, //place subtitles for 3 videos 
     targetSubtitleLines: [], //
     selectshow: false,
  }


  handleChange = (e) => {
     this.setState({[e.target.name]:e.target.value.toLowerCase()})
  };


  fetchWord = (e) => { 
    e.preventDefault();
    console.log(this.state.inputWord)//You will get value here
    axios.get('https://bestapi-ted-v1.p.rapidapi.com/transcriptFreeText',
    {params: {
      size:2,
      text: this.state.inputWord,
      "rapidapi-key": process.env.NEXT_PUBLIC_API_KEY
    } //put param with - in ""
    }
      )
    .then(res => {
      // console.log(res.data); 
      this.setState({videoIDs: res.data.map(element => {
                return element.youTubeID;
              })})
      this.setState({videoTitles: res.data.map(element => {
                return element.name;
              })})

              
              
      console.log(res.data.map(element => {
        return element.youTubeID}))
      console.log(this.state.videoIDs[1]); //stateにアクセスして値を取得できているので、上のsetstateは完了している
      const resultList = Promise.all( 
        //promise.all promise aynsc await 非道j機処理-jsの処理を待たせる　promiseもwawaitみたいに待つよってやつで、allオプションは　　promiseの戻り値が配列としてリターンされるときに、使うことができる
        this.state.videoIDs.map(async (videoID) => 　//mapのなかasync await を使う
        await axios.get(
          "https://subtitles-for-youtube.p.rapidapi.com/subtitles/" + videoID + 
            "?translated=None&type=None&lang=en&rapidapi-key=" + process.env.NEXT_PUBLIC_API_KEY)))
    
      return resultList
      // return(axios.get("https://subtitles-for-youtube.p.rapidapi.com/subtitles/" + this.state.videoIDs[0] + "?translated=None&type=None&lang=en&rapidapi-key=162b20e307msh2eba9c1841b675cp1fbe1fjsnc8adcd4c4201")) //ここでforLoopをかけて、全てのvideoIDの数の字幕をゲットしたい
    })
    .then(
      res => {
        console.log(res)
        
        this.setState({subtitleDatas: res.map(videodata => {
          return videodata.data
        })})
        console.log(this.state.subtitleDatas) 

        let subtitleWord = [];
  
        for (let i = 0; i < this.state.subtitleDatas.length; i++) {
          subtitleWord.push(
            this.state.subtitleDatas[i].filter((element) => {
              return element.text.includes(this.state.inputWord) === true;
                /* Thank youとか先頭が大文字になる奴は inputWordが全部小文字になるので、includeでtrueにならず、textの値がundefinedになる */
            })
  
          )
        }

        console.log(subtitleWord)
        this.setState({targetSubtitleLines: subtitleWord})
        console.log(this.state.targetSubtitleLines)
  
        this.setState({selectshow: true})
      
      }
    )
  }




  render() {

    // const cards = 
    let cards = null;
    
    if (this.state.selectshow) { //これのおかげでapi通信後に下の記述
      console.log(this.state.videoIDs[0])
      console.log(this.state.subtitleDatas)
      cards =  (
        <>
          {this.state.videoIDs.map((ID, i) => {
            // console.log(this.state.subtitleDatas[i][i].text)
            return <Card id={ID} title={this.state.videoTitles[i]} text={this.state.targetSubtitleLines[i]} key={i}></Card>
          })}
          <iframe id="ytplayer" type="text/html" width="640" height="360"
            src={"https://www.youtube.com/embed/" + this.state.videoIDs[0] + "?autoplay=0&origin=http://example.com"}
            frameBorder="0">  
          </iframe>
          <VirtualizedList sub={this.state.subtitleDatas[0]}/>
          
        </>
        )
    }

      return (
          <>
              <form onSubmit = {this.fetchWord}> {/* //refer your function using `this`. Need page transtion here as well */}
                  <input type = 'text' placeholder = 'happiness, in order to, put aside...' name="inputWord" value={this.state.inputWord} onChange={this.handleChange} ></input>
                  <input type='submit' placeholder='GO' value = 'GO'></input>
              </form>
              {cards}

              
              

             
          </>
      );
  }
}


// import Head from "next/head";
// import axios from "axios";
// import React, { Component } from "react";
// import Link from "next/link";
// import Card from "./Card";
// import VirtualizedList from "./List";
// import happiness from "../components/happiness.json";
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputWord: "",
//       videoTitles: [],
//       videoIDs: [], //holds youtubeID from tedAPI to use them in subtitleAPI and thumbnail
//       subtitleDatas: [], //place subtitles for 3 videos
//       targetSubtitleLines: [], //
//       selectshow: false,
//     };
//   }
//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value.toLowerCase() });
//   };
//   getFromAPI = async () => {
//     try {
//       const response = await axios.get(
//         "https://bestapi-ted-v1.p.rapidapi.com/transcriptFreeText",
//         {
//           params: {
//             size: 3,
//             text: this.state.inputWord,
//             "rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
//           }, //put param with - in ""
//         }
//       );
//       return response;
//     } catch (e) {
//       console.log("--- error");
//       return happiness;
//     }
//   };
//   getVideos = async (result) => {
//     this.setState({
//       videoIDs: result.data.map((element) => {
//         return element.youTubeID;
//       }),
//     });
//     this.setState({
//       videoTitles: result.data.map((element) => {
//         return element.name;
//       }),
//     });
//     console.log(
//       result.data.map((element) => {
//         return element.youTubeID;
//       })
//     );
//     console.log(this.state.videoIDs[1]); //stateにアクセスして値を取得できているので、上のsetstateは完了している
//     const resultList = await Promise.all(
//       //promise.all promise aynsc await 非道j機処理-jsの処理を待たせる　promiseもwawaitみたいに待つよってやつで、allオプションは　　promiseの戻り値が配列としてリターンされるときに、使うことができる
//       this.state.videoIDs.map(
//         async (
//           videoID //mapのなかasync await を使う
//         ) =>
//           await axios.get(
//             "https://subtitles-for-youtube.p.rapidapi.com/subtitles/" +
//               videoID +
//               "?translated=None&type=None&lang=en&rapidapi-key=" +
//               process.env.NEXT_PUBLIC_API_KEY
//           )
//       )
//     );
//     return resultList;
//     // return(axios.get("https://subtitles-for-youtube.p.rapidapi.com/subtitles/" + this.state.videoIDs[0] + "?translated=None&type=None&lang=en&rapidapi-key=162b20e307msh2eba9c1841b675cp1fbe1fjsnc8adcd4c4201")) //ここでforLoopをかけて、全てのvideoIDの数の字幕をゲットしたい
//   }
//   fetchWord = async (e) => {
//     e.preventDefault();
//     const result = await this.getFromAPI();
//     const res = await this.getVideos(result);
//     this.setState({
//       subtitleDatas: res.map((videodata) => {
//         return videodata.data;
//       }),
//     });
//     console.log(this.state.subtitleDatas);
//     console.log(this.state.subtitleDatas);
//     let subtitleWord = [];
//     for (let i = 0; i < this.state.subtitleDatas.length; i++) {
//       subtitleWord.push(
//         this.state.subtitleDatas[i].filter((element) => {
//           return element.text.includes(this.state.inputWord) === true;
//           /* Thank youとか先頭が大文字になる奴は inputWordが全部小文字になるので、includeでtrueにならず、textの値がundefinedになる */
//         })
//       );
//     }
//     console.log(subtitleWord);
//     this.setState({ targetSubtitleLines: subtitleWord });
//     console.log(this.state.targetSubtitleLines);
//     this.setState({ selectshow: true });
//   };
//   render() {
//     // const cards =
//     let cards = null;
//     if (this.state.selectshow) {
//       //これのおかげでapi通信後に下の記述
//       console.log(this.state.videoIDs[0]);
//       cards = (
//         <>
//           {this.state.videoIDs.map((ID, i) => {
//             // console.log(this.state.subtitleDatas[i][i].text)
//             return (
//               <Card
//                 id={ID}
//                 title={this.state.videoTitles[i]}
//                 text={this.state.targetSubtitleLines[i]}
//               ></Card>
//             );
//           })}
//           <iframe
//             id="ytplayer"
//             type="text/html"
//             width="640"
//             height="360"
//             src={
//               "https://www.youtube.com/embed/" +
//               this.state.videoIDs[0] +
//               "?autoplay=1&origin=http://example.com"
//             }
//             frameborder="0"
//           ></iframe>
//           <VirtualizedList sub={this.state.subtitleDatas} />
//         </>
//       );
//     }
//     return (
//       <>
//         <form onSubmit={this.fetchWord}>
//           {" "}
//           {/* //refer your function using `this`. Need page transtion here as well */}
//           <input
//             type="text"
//             placeholder="happiness, in order to, put aside..."
//             name="inputWord"
//             value={this.state.inputWord}
//             onChange={this.handleChange}
//           ></input>
//           <input type="submit" placeholder="GO" value="GO"></input>
//         </form>
//         {cards}
//       </>
//     );
//   }
// }
// export default App;