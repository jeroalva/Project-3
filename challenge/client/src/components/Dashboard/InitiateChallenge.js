import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Divider, makeStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import API from '../../utils/API';
import { Link, withRouter } from 'react-router-dom';


const InitiateChallenge = (props) => {
  return (
    <Card width="400px">
      <CardHeader title={props.challengeInfo.name} align="center"/>
      <Divider variant="middle" />
      <CardContent>
        <Typography align="center">
          Your challenge hasn't been  started
        </Typography>
        <div>
          <Typography align="center">Jero</Typography>
          <Typography align="center">Sync notes</Typography>
          <Typography align="center">Set deadline</Typography>
        </div>
      </CardContent>
      <Divider variant="middle" />
      <CardActions>
        <Button 
        variant="contained"
        color="primary"
        align="center"
        onClick={startChallengeFunc}
        >
          Start!
        </Button>
      </CardActions>
    </Card>
  );

  function startChallengeFunc(){
    console.log("Challenge that will be started: ",props.challengeInfo._id)
    API.startChallenge({challengeId: props.challengeInfo._id})
       .then(props.history.replace('/dashboard'))
  }
  
};

export default withRouter(InitiateChallenge);