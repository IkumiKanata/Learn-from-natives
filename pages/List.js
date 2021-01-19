import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
  },
}));

function RenderRow(props) { 
  console.log("-----------2-------------")

  const { index, style } = props;
  // console.log(props)
  console.log(JSON.stringify(props.sub))



  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
      <ListItemText primary={props.sub} />  
      {/* ここのListItemTextに受け取った別ファイルである親コンポーネントから受け取って、利用したい*/}
    </ListItem>
  );
}

// RenderRow.propTypes = {
//   index: PropTypes.number.isRequired,
//   style: PropTypes.object.isRequired,
// };

export default function VirtualizedList(props) { //親コンポーネントからはここに
  const classes = useStyles();
  
console.log("-----------1-------------")
  return (
    <div className={classes.root}>
      <h1>{props.sub}</h1>
      <FixedSizeList height={400} width={400} itemSize={46} itemCount={200} sub={props.sub}>


    {RenderRow}
      </FixedSizeList>
    </div>
  );
}

