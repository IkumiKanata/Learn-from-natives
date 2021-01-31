import React, { forwardRef } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 500,
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
}));

function RenderRow(props) { 
  // console.log(props.Ref)

  const {data,index, style,} = props;
  console.log(props)



  return (
    <ListItem button style={style} key={index} onClick={() => {props.data.time(data.sub[index].start)}}>
      <PlayCircleOutlineRoundedIcon/>
      <ListItemText primary={data.sub[index].text}  />  
      {/* ここのListItemTextに受け取った別ファイルである親コンポーネントから受け取って、利用したい*/}
    </ListItem>
  );
}

RenderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  
};

export default function VirtualizedList(props) { //親コンポーネントからはここに
  const classes = useStyles();
  console.log(props.timeHandler)


  // if(props.targetSub) { //もし、渡されてきたpropsがtargetなら、targetをレンダー

    return (
      <div className={classes.root}> 
        <FixedSizeList height={400} width={400} itemSize={66} itemCount={200} itemCount={props.sub.length} itemData={{sub:props.sub, time:props.timeHandler}} >  
      {RenderRow}
        </FixedSizeList>
      </div>
    );
  // }else if(props.fullSub) {
  //   return (
  //     <div className={classes.root}> 
  //       <FixedSizeList height={400} width={400} itemSize={66} itemCount={200} itemCount={props.fullSub.length} itemData={{sub:props.fullSub, time:props.time}}>  
  //     {RenderRow}
  //       </FixedSizeList>
  //     </div>
  //   );
  // }
}


// import React from "react";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import { FixedSizeList } from "react-window";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     height: 400,
//     maxWidth: 450,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));
// function RenderRow(props) {
//   // console.log("-----------2-------------");
//   const { index, style, sub } = props;
//   // console.log(JSON.stringify(props.sub));
//   console.log("=----");
//   console.log(props.sub[0].text);
//   return (
//       <>
//         {props.sub.map((data, i) => {
//           return (
//             <ListItem button style={style} key={i}>
//             <ListItemText primary={`Line ${i + 1}`} />
//               <ListItemText primary={data.text} />
//               </ListItem>


//            );
//         })}
//         {/* <ListItemText primary={`Item ${index + 1}`} />
//         <ListItemText primary={props.sub} /> */}
//         {/* ここのListItemTextに受け取った別ファイルである親コンポーネントから受け取って、利用したい*/}
//       </>
//   );
// }
// RenderRow.propTypes = {
//   index: PropTypes.number.isRequired,
//   style: PropTypes.object.isRequired,
// };
// export default function Virtualizes (props) {
//   //親コンポーネントからはここに
//   const classes = useStyles();
//   console.log("-----------1-------------");
//   console.log(props.sub[0]);
//   const { index, style } = props;
//   return (
//     <div className={classes.root}>
//       <RenderRow sub={props.sub} />
//     </div>
//   );
// }

