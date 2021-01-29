import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import VirtualizedList from "../components/List";
import axios from "axios";
import Link from 'next/link';
import VideoPlayer from "../components/YoutubePlayer";
import PinnedSubheaderList from "../components/List2";



const Comment = () => {
  const router = useRouter()
  const slug = router.query.slug || []
  console.log(router.query.slug)

const [data1, setData1] = useState({ hits:[] });
const [data2, setData2] = useState({hit2:[]});
const [showResults, setShowResults] = useState(true)

 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://subtitles-for-youtube.p.rapidapi.com/subtitles/" + router.query.slug[1] + "?translated=None&type=None&lang=en&rapidapi-key=" + process.env.NEXT_PUBLIC_API_KEY
      );
 
      setData1(result.data);
       console.log(data1)
      let targetsub = [];
      // setsubData(
        
      targetsub.push(
          result.data.filter((element) => {
            return element.text.toLowerCase().includes(router.query.slug[2]) === true;
          })
        )

      // )
      console.log(data1)
      setData2(targetsub[0])
      console.log(data2)
    };
 
    fetchData();
  }, []);




  return (

    <>
    <Link href="/about">
      <a>back to search </a>
    </Link>
      {/* <h1>Slug: {slug.join('/')}</h1> */}

      <VideoPlayer videoId={router.query.slug[1] } title={router.query.slug[2]} fullSub={data1} targetSub={data2} />




      
         {/* <button onClick={() => {
           setShowResults(!showResults)
         }}>{showResults? "Show Full script":"Show target lines"}</button>
      {showResults ? <h1>Phrases with {router.query.slug[2]}</h1>:<h1>FULLSUB</h1>}
      {showResults ? <VirtualizedList targetSub={data2}/>:
      <VirtualizedList fullSub={data1}/>} */}
      
         {/* <button onClick={() => {
           setShowResults(!showResults)
         }}>{showResults? "Show Full script":"Show target lines"}</button>
      {showResults ? <h1>Phrases with {router.query.slug[2]}</h1>:<h1>FULLSUB</h1>}
      {showResults ? <PinnedSubheaderList sub={data2}/>:
      <PinnedSubheaderList sub={data1}/>}  */}
    </>
  )
}

export default Comment



// + import React, { useState, useEffect } from 'react';
// + import axios from 'axios';

// function App() {
//   const [data, setData] = useState({ hits: [] });

// +  useEffect(async () => {
// +    const result = await axios(
// +      'http://hn.algolia.com/api/v1/search?query=redux',
// +    );
// +
// +    setData(result.data);
// +  });

//   return (
//     <ul>
//       {data.hits.map(item => (
//         <li key={item.objectID}>
//           <a href={item.url}>{item.title}</a>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default App;