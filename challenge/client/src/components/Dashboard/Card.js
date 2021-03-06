import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CustomizedRatings from "./Rating";
import FormDialog from "./FormDialog";
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import firebase from "../firebase";
import UserContext from "../../utils/UserContext"
import Button from "react"
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function UserCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.username[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.username}
        subheader={"Challenge: " + props.genObj.challenges.name}
      />
      <CustomizedRatings />
      {/* <Typography component="div">
      <Box textAlign="left" fontWeight="fontWeightLight" m={1} fontSize={14}>
        {"Date created: " + props.genObj.creationDate}
      </Box>
      </Typography> */}
      <Divider variant="middle" />
      <CardContent>
        <FormDialog genObj={props.genObj} addActivity={props.addActivity} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        ></IconButton>
        <Typography component="div">
      <Box textAlign="left" fontWeight="fontWeightLight" m={1} fontSize={14}>
        {"Invitation code: " + props.genObj.challenges._id}
      </Box>
      </Typography>
      </CardActions>
    </Card>
  );
}
