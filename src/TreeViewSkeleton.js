import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeViewChild from './TreeViewChild';
// import Response from 'response.json';

const useStyles = makeStyles({
  root: {
    // height: 216,
    height : '100vh',
   display : 'flex',
   flexDirection : 'column',
   
    alignItems : 'center',
    justifyContent : 'center',
    // maxWidth: 400,
  },
});

export default function MultiSelectTreeView() {
  const classes = useStyles();

  
  const [data,setData] = React.useState({});

  const getData=()=>{
    fetch('response.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        // console.log(response)
        return response.json();
      })
      .then(function(myJson) {
          
          
          setData(myJson.body.Recommendations);
         
        console.log("Json is",myJson.body.Recommendations);
      });
  }

  React.useEffect(()=>{
    getData()
  },[])
  
  const getInternalTree = (item) => {
    //   console.log("Item is",item);
   
      item.map((data,index) => {
          if(!data.children || data.children.length === 0){
              return (<TreeItem nodeId={data.id} label={data.name}/>)
          }
        return(
            <TreeItem nodeId={data.id} label={data.name}>
                {getInternalTree(data.children)}
            </TreeItem>
        )
        
        
      })
  }
  
  if(data.length > 0){
    return (
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
        >
         
         {
             data.map((d,index) => {
                 
                 return(
                     <TreeItem nodeId={d.RestaurantID.toString()} label={d.RestaurantName}>
                         <TreeItem nodeId={d.menu[0].id.toString()} label={d.menu[0].name}>
                                
                                {/* {getInternalTree(d.menu[0].children)} */}
                                <TreeViewChild data={d.menu[0]}/>
                            
                        </TreeItem>
                     </TreeItem>
                 )
             })
         }
        </TreeView>
      ) 
  }
    else{
        return(<h1>Loading..</h1>)
    }   
  
  
}


// var len = 0;

// function treeDepth(item){
//     // console.log("Length is", len);
//     // console.log("item children length", item["children"]?.length);
//     if(!item || item.length === 0){
//       let temp = len;
//       len = 0;
//       // console.log("ittr");
//       return temp;
//     }
  
//       len++;
//       return treeDepth(item[0].children)
      
    
    
    
  
//   }