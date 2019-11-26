import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Card from "../../components/Card/Card.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
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
function BookSkeleton(props){
    //const { classes } = props;
    var repeat = [1, 2, 3, 4, 5, 6];

    return(
        
            repeat.map((index) =>  (
        
            <Grid item xs={12} md={4} key={index}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <Skeleton variant="square" width={120} height={120}/>
                </a>
              </CardAvatar>
              <CardBody profile>
                <Skeleton height={9} width="100%"/>
                <Skeleton height={9} width="70%"/>
              </CardBody>
            </Card>
            </Grid>
        ))
    )
}

//export default withStyles(styles)(BookSkeleton);
export default (BookSkeleton);