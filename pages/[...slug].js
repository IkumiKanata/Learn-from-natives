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

const [data, setData] = useState({ hits: [] });
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://subtitles-for-youtube.p.rapidapi.com/subtitles/" + router.query.slug[1] + "?translated=None&type=None&lang=en&rapidapi-key=" + process.env.NEXT_PUBLIC_API_KEY
      );
 
      setData(result.data);
    };
 
    fetchData();
    console.log(data)
  }, []);




  return (
    <>
    <Link href="/about">
      <a>back to search </a>
    </Link>
      <h1>Slug: {slug.join('/')}</h1>
      <iframe id="sup" width="560" height="315" src={"https://www.youtube.com/embed/" + router.query.slug[1] + "?start=" + time} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <Example videoId={router.query.slug[1]}/>
      <VirtualizedList sub={data}/>
      
      
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