import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import { withStyles } from '@material-ui/core/styles';
/*
const styles = theme => ({
    block: {
        display: 'block',
      },
      inline: {
        display: 'inline',
      },
})
*/
function ReaderSkeleton(props){
    //const { classes } = props;
    var repeat = [1, 2, 3, 4, 5, 6];

    return(
        
            repeat.map((index) =>  (
        
            <Grid item xs={12} md={4} key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Skeleton variant="circle" width={60} height={60}/>
              </ListItemAvatar>
              <ListItemText
                secondaryTypographyProps={{component: "div"}}
                primary={
                    <React.Fragment>
                      <Skeleton height={9} width="90%"/>
                    </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                      <Skeleton height={9} width="50%"/>
                      <Skeleton height={9} width="40%"/>
                    </React.Fragment>
                }
              />
            </ListItem>
            </Grid>
        ))
    )
}

//export default withStyles(styles)(ReaderSkeleton);
export default (ReaderSkeleton);