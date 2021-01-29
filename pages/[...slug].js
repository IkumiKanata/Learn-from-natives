import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import VideoPlayer from "../components/YoutubePlayer";
import { CreateSubtitleForYoutube } from "../constans/URLs";

const Comment = () => {
  const router = useRouter();

  const [data1, setData1] = useState({ hits: [] });
  const [data2, setData2] = useState({ hit2: [] });

  const videoId = router.query.slug[1];
  const title = router.query.slug[2];

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

  return (
    <>
      <Link href="/about">
        <a>back to search </a>
      </Link>
      <VideoPlayer
        videoId={videoId}
        title={title}
        fullSub={data1}
        targetSub={data2}
      />
    </>
  );
};

export default Comment;
