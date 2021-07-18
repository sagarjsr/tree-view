import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';


function TreeViewChild({data}) {
   
    return (
        
            data.children.map((d) => (
                <TreeItem nodeId={d.id} label={d.name}>
                {(d.children && d.children.length > 0)&&
                <TreeViewChild data={d} />}
                </TreeItem>
            ))
       
    )
   
}

export default TreeViewChild
