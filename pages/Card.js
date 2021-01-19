import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 200,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  const img = "http://img.youtube.com/vi/" + props.id + "/mqdefault.jpg";

    return (
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
  );
}
