import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ListSubheader: {
    backgroundColor:"blue"
  }
}));

export default function PinnedSubheaderList(props) {
  const classes = useStyles();
  console.log(props)

  return (
    <List className={classes.root} subheader={<li />}>
     
            <ListSubheader >{`SUBTITLE`}</ListSubheader>
            {props.sub.map((item) => (
              <ListItem button onClick={() => {console.log("hey")}}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
         
    </List>
  );
}
