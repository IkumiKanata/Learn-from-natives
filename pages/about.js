import Head from 'next/head'

import axios from "axios";
import React, {Component} from "react"; 
import Link from 'next/link';
import Card from "./Card"

export default class App extends Component {
  state={
     inputWord: '',
     videoIDs: [], //holds youtubeID from tedAPI to use them in subtitleAPI and thumbnail 
     subtitleDatas:[], //place subtitles for 3 videos 
     tatgetSubtitleLine: []
  }


  handleChange = (e) => {
     this.setState({[e.target.name]:e.target.value.toLowerCase()})
  }
  fetchWord = (e) => { 
    e.preventDefault();
    console.log(this.state.inputWord)//You will get value here
    axios.get('https://bestapi-ted-v1.p.rapidapi.com/transcriptFreeText',
    {params: {
      size:3,
      text: this.state.inputWord,
      "rapidapi-key": "162b20e307msh2eba9c1841b675cp1fbe1fjsnc8adcd4c4201"} //put param with - in ""
    }
      )
    .then(res => {
      // console.log(res.data); 
      this.setState({videoIDs: res.data.map(element => {
                return element.youTubeID;
              })})
              
              
      console.log(res.data.map(element => {
        return element.youTubeID}))
      console.log(this.state.videoIDs[1]); //stateにアクセスして値を取得できているので、上のsetstateは完了している
      const resultList = Promise.all( 
        //promise.all promise aynsc await 非道j機処理-jsの処理を待たせる　promiseもwawaitみたいに待つよってやつで、allオプションは　　promiseの戻り値が配列としてリターンされるときに、使うことができる
        this.state.videoIDs.map(async (videoID) => 　//mapのなかasync await を使う
        await axios.get(
          "https://subtitles-for-youtube.p.rapidapi.com/subtitles/" + videoID + 
            "?translated=None&type=None&lang=en&rapidapi-key=162b20e307msh2eba9c1841b675cp1fbe1fjsnc8adcd4c4201")))
    
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
      
      }
    )
  }




  render() {

    // const cards = 
      return (
          <>
              <form onSubmit = {this.fetchWord}> {/* //refer your function using `this`. Need page transtion here as well */}
                  <input type = 'text' placeholder = 'happiness, in order to, put aside...' name="inputWord" value={this.state.inputWord} onChange={this.handleChange} ></input>
                  {/* <Link href="/"> */}
                  <input type = 'submit' placeholder='GO' value = 'GO'></input>
                  {/* </Link> */}

              </form>
              <Card id={"IoRjz8iTVoo"}/>
          </>
      );
  }
}


// import Head from 'next/head'
// import Link from "next/link"

// export default function Home() {
//   return (
//     <div className="container">
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1 className="title">
//           Read{' '}
//           <Link href="/">
//             <a>back to the root </a>
//           </Link>
//         </h1>

//         <p className="description">
//           Get started by editing <code>pages/index.js</code>
//         </p>

//         <div className="grid">
//           <a href="https://nextjs.org/docs" className="card">
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className="card">
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className="card"
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className="card"
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
//         </a>
//       </footer>

//       <style jsx>{`
//         .container {
//           min-height: 100vh;
//           padding: 0 0.5rem;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }

//         main {
//           padding: 5rem 0;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }

//         footer {
//           width: 100%;
//           height: 100px;
//           border-top: 1px solid #eaeaea;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         footer img {
//           margin-left: 0.5rem;
//         }

//         footer a {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         a {
//           color: inherit;
//           text-decoration: none;
//         }

//         .title a {
//           color: #0070f3;
//           text-decoration: none;
//         }

//         .title a:hover,
//         .title a:focus,
//         .title a:active {
//           text-decoration: underline;
//         }

//         .title {
//           margin: 0;
//           line-height: 1.15;
//           font-size: 4rem;
//         }

//         .title,
//         .description {
//           text-align: center;
//         }

//         .description {
//           line-height: 1.5;
//           font-size: 1.5rem;
//         }

//         code {
//           background: #fafafa;
//           border-radius: 5px;
//           padding: 0.75rem;
//           font-size: 1.1rem;
//           font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
//             DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
//         }

//         .grid {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-wrap: wrap;

//           max-width: 800px;
//           margin-top: 3rem;
//         }

//         .card {
//           margin: 1rem;
//           flex-basis: 45%;
//           padding: 1.5rem;
//           text-align: left;
//           color: inherit;
//           text-decoration: none;
//           border: 1px solid #eaeaea;
//           border-radius: 10px;
//           transition: color 0.15s ease, border-color 0.15s ease;
//         }

//         .card:hover,
//         .card:focus,
//         .card:active {
//           color: #0070f3;
//           border-color: #0070f3;
//         }

//         .card h3 {
//           margin: 0 0 1rem 0;
//           font-size: 1.5rem;
//         }

//         .card p {
//           margin: 0;
//           font-size: 1.25rem;
//           line-height: 1.5;
//         }

//         .logo {
//           height: 1em;
//         }

//         @media (max-width: 600px) {
//           .grid {
//             width: 100%;
//             flex-direction: column;
//           }
//         }
//       `}</style>

//       <style jsx global>{`
//         html,
//         body {
//           padding: 0;
//           margin: 0;
//           font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
//             Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
//             sans-serif;
//         }

//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//     </div>
//   )
// }