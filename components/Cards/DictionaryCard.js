import React, { useState,useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import firebase from "firebase";
import { UserContext } from '../../lib/context';
import toast from 'react-hot-toast';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import styled from "styled-components"
import { Button } from '../../globalStyles';


import {
  NavItemBtn,
  NavBtnLink
} from "../Navbar/Navbar.elements"

export const SubtitleButton = styled.button`
  background-color: #4b59f7;
  /* border-bottom: 5px solid #4b59f7; */
  color:white;
  border-radius:4px;
  padding: 10px;
  cursor:pointer;
 
  &:hover {
   transition: all 0.3s ease-out;
  /* margin-top: 3px; */
  color: white;
  background-color: #0467fb;
  /* border-bottom: 5px solid #0467fb; */
}

  @media screen and (max-width: 700px) {

    padding:0
    }

  

`

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
     const uid = user.user.uid;
    const doc = await db.collection("users").doc(uid).collection("words").doc(props.dictionaryData[0].word).set(props.dictionaryData[0]);

    toast.success("Added to Favorite!")
   }



  if (!props.selectshow || !props.dictionaryData) return null;

  return (
    <Card className={classes.root}>
      {user.user&& 
      <div >
        <SubtitleButton onClick={handleClickFetchButton}>
        お気に入り単語へ登録
        <BookmarkIcon></BookmarkIcon>
        </SubtitleButton>

      </div>
      }
      <CardContent className={classes.pointerNone}>
        <Typography className={classes.title} color="primary" gutterBottom>
          Your Search Word
        </Typography>
        <>
        <Typography variant="h5" component="h2">
        {props.dictionaryData[0].word}

          
        </Typography>
        </>
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

