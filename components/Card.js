import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from "next/link";

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
    background: "lightblue",
    borderRadius: "5px",
    boxShadow: "0 2px 5px ccc",
    width: "calc(33.333% – 10px)",
    margin:"0 15px 15px 0",

  },
  media: {
    height: 200,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  



  const img = "http://img.youtube.com/vi/" + props.id + "/mqdefault.jpg";

    return (
      <Link passHref
       href="pages/[...slug]"
       as={"/videoplayer/" + props.id + "/"  + props.inputWord}  
      >
    <Card className={classes.root}>
      <CardActionArea>
          
        <CardMedia
          className={classes.media}
          image={"http://img.youtube.com/vi/" + props.id + "/mqdefault.jpg"}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text[0].text}    
            {/* Thank youとか先頭が大文字になる奴は inputWordが全部小文字になるので、includeでtrueにならず、textの値がundefinedになる */}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    </Link>
  );
}



