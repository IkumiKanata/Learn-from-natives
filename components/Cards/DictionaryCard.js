import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyB5TYufQVlkVtADAlS_xhVL2oL4k3HHyak",
  authDomain: "learn-from-natives.firebaseapp.com",
  projectId: "learn-from-natives",
  storageBucket: "learn-from-natives.appspot.com",
  messagingSenderId: "738772907323",
  appId: "1:738772907323:web:3debff946ad22f1ed3b31e",
  measurementId: "G-T778FW5NZ1"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


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

export default function DictionaryCard(props) {
  const classes = useStyles();

   const handleClickFetchButton = async () => {
     const db = firebase.firestore(); 
    const doc = await db.collection("targetwords").doc(props.dictionaryData[0].word).set(props.dictionaryData[0]);
   }



  if (!props.selectshow || !props.dictionaryData) return null;

  return (
    <Card className={classes.root}>
      <button onClick={handleClickFetchButton}>お気に入り</button>
      <CardContent className={classes.pointerNone}>
        <Typography className={classes.title} color="primary" gutterBottom>
          Your Search Word 
        </Typography>
        <Typography variant="h5" component="h2">
        {props.dictionaryData[0].word}

          
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.dictionaryData[0].meanings[0].partOfSpeech}
        </Typography>
        <Typography variant="body2" component="p">
        {"[ Definition ]"}
        <br />

          {props.dictionaryData[0].meanings[0].definitions[0].definition}
            <br />
            <br />
          {"[  Example sentense  ]"}
          <br />
          {props.dictionaryData[0].meanings[0].definitions[0].example || "no example sentense found"} 

        </Typography>
      </CardContent>
        <br />

        <div>
            Learn more with:<span>&ensp;</span><br />


          <a href={"https://www.thefreedictionary.com/" + props.dictionaryData[0].word} target="_blank" rel="noopener noreferrer">EN-EN DICT</a>  
          <span>&ensp;</span>
          <a href={"https://ejje.weblio.jp/content/" + props.dictionaryData[0].word} target="_blank" rel="noopener noreferrer">JP-EN DICT</a>

        </div>
        <br />


    </Card>
  );
}

