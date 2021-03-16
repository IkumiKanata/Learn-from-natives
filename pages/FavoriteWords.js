import Head from 'next/head'
import React, { useState, useEffect,useContext } from "react";
import Link from "next/link";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import firebase from "firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext } from "../lib/context";
import { firestore, auth, serverTimestamp } from '../lib/firebase';
import AuthCheck from "../components/AuthCheck"





const useStyles = makeStyles({
  root: {

    margin: "0 auto",
    width: "70%",
    background: "",
     textAlign: "center"

  },
  pointerNone: {
    pointerEvents: "none"
  },


  title: {
    fontSize: 20,
    
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DictionaryCard() {
  const user = useContext(UserContext);
  const classes = useStyles();
  const [words, setWords] = useState("");
  const [loading,setLoading] = useState(true);
  
  const getData = async () => {
    setLoading(true);
    const db = firebase.firestore();
    const uid = await auth.currentUser.uid;
    const wordscontainer = [] 
    const snapshot = await db.collection("users").doc(uid).collection("words").get();
  snapshot.forEach(doc => {
    wordscontainer.push(doc.data())
    console.log(doc.data())
  })
  setWords(wordscontainer);
  setLoading(false);
};



   const handleClickDeleteButton = async (word) => {
    const db = firebase.firestore(); 
    const uid = await auth.currentUser.uid;

    await db.collection("users").doc(uid).collection("words").doc(word).delete();
    getData()


 
    //  return () => {
    //    cleanup
    //  }
   }


  
  return (
    <div>
      <AuthCheck>

      <button onClick={getData}>更新</button>
    {loading ? <CircularProgress style={{margin: "0 auto"}} />:
    <>
   {words.map((word) => {
     return (
       <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", marginBottom:"10px" }}>
    <Card className={classes.root}>
  
      <CardContent className={classes.pointerNone}>
        {/* <Typography className={classes.title} color="primary" gutterBottom>
          Your Search Word 
        </Typography> */}
        {console.log(word.word)}
        <Typography variant="h5" component="h2">
        {word.word}

        </Typography>
          
        <Typography className={classes.pos} color="textSecondary">
        {word.meanings[0].partOfSpeech}
        </Typography>
        <Typography variant="body2" component="p">
        {"[ Definition ]"}
        <br />
        
        {word.meanings[0].definitions[0].definition}
        <br />
        <br />
        {"[  Example sentense  ]"}
        <br />
        {word.meanings[0].definitions[0].example || "no example sentense found"} 
        
        </Typography>
        </CardContent>
        <br />
        
        <div>
        Learn more with:<span>&ensp;</span><br />
        
        
        <a href={"https://www.thefreedictionary.com/" + word.word} target="_blank" rel="noopener noreferrer">EN-EN DICT</a>  
        <span>&ensp;</span>
        <a href={"https://ejje.weblio.jp/content/" + word.word} target="_blank" rel="noopener noreferrer">JP-EN DICT</a>
        
        </div>
      <br />
<button 
onClick={() => {handleClickDeleteButton(word.word)}}
>削除</button>
<Link passHref href={{ pathname: '/VideoSelect', query: { keyword: word.word  } }}>
<button 
>{word.wordを使った}この単語の動画検索</button>
      </Link>




    </Card>
          </div>
          
          );
        })}
    
      </>}
      
        </AuthCheck>
      </div>
  );
}


{/* <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center" }}>
      {videoIDs.map((ID, i) => {
        return (
          <MediaCard style={{width:"100%"}}
            id={ID}
            title={videoTitles[i]}
            text={targetSubtitleLines[i]}
            inputWord={inputWord}
            key={i}
          />
        );
      })}
    </div> */}