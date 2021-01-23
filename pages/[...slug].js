import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import VirtualizedList from "../components/List";
import axios from "axios";
import Example from "../components/YoutubePlayer";
import Link from 'next/link';

const Comment = () => {
  const router = useRouter()
  const slug = router.query.slug || []
  console.log(router.query.slug)
  let time = 100;

  // const [data, setData] = useState([]);

// useEffect(async () => {
// const result = await axios.get(
//   "https://subtitles-for-youtube.p.rapidapi.com/subtitles/" + router.query.slug[1] + 
//             "?translated=None&type=None&lang=en&rapidapi-key=" + process.env.NEXT_PUBLIC_API_KEY)
    

//     setData(result.data);
//     console.log(data)
//   }, []);

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
      {/* <iframe id="sup" width="560" height="315" src={"https://www.youtube.com/embed/" + router.query.slug[1] + "?start=" + time} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
      <Example videoId={router.query.slug[1]}/>
      
         <button onClick={() => {
           setShowResults(!showResults)
         }}>{showResults? "Show Full script":"Show target lines"}</button>
      {showResults ? <h1>Phrases with {router.query.slug[2]}</h1>:<h1>FULLSUB</h1>}
      {showResults ? <VirtualizedList sub={data2}/>:
      <VirtualizedList sub={data1}/>}
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