import React, { useState,useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import firebase from "firebase";
import { UserContext } from '../../lib/context';
import toast from 'react-hot-toast';




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
  const user = useContext(UserContext);
  const classes = useStyles();
   const handleClickFetchButton = async () => {
     const db = firebase.firestore(); 
    const doc = await db.collection("users").doc(user.user.uid).collection("words").doc(props.dictionaryData[0].word).set(props.dictionaryData[0]);
    toast.success("Saved!")
   }



  if (!props.selectshow || !props.dictionaryData) return null;

  return (
    <Card className={classes.root}>
      {user.user&& <button onClick={handleClickFetchButton}>お気に入り</button>}
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

