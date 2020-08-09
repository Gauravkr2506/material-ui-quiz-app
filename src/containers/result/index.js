import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import successSvg from "./../../assets/success.svg";
import failureSvg from "./../../assets/failure.svg";

import { modifyDataAction } from "./../../store/action";

const useStyles = makeStyles((theme) => ({
  svgContainer: {
    width: "90%",
    height: "200px",
    margin: "0 auto",
    border: "1px",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    userSelect: "none",
  },
  resultSVG: {
    height: "100%",
    width: "100%",
    margin: "0 auto",
  },
  resultParagraph: {
    textAlign: "center",
  },
  resetButton: {
    display: "block",
    margin: "60px auto",
  },
}));

function Result(props) {
  const classes = useStyles();

  const tryAgain = () => {
    props.modifyDataAction({ questions: [], user_score: 0 });
    props.history.push("questions");
  };

  return (
    <>
      <Typography style={{ textAlign: "center" }} variant="h2">
        Result
      </Typography>
      <div className={classes.svgContainer}>
        <img
          src={props.pass ? successSvg : failureSvg}
          className={classes.resultSVG}
          alt="logo"
        />
        <Typography className={classes.resultParagraph} variant="h5">
          {props.pass ? "Pass😊" : "Failed!😟"}
        </Typography>
        <pre className={classes.resultParagraph}>
          Hi <strong>{props.user_name}</strong>, your score is{" "}
          {props.user_score}/{props.total_score}
        </pre>

        <Button
          variant="contained"
          className={classes.resetButton}
          onClick={tryAgain}
          color="secondary"
        >
          Try Again
        </Button>
      </div>
    </>
  );
}

function isUserPass(state) {
  if (state.questions.length === 0) {
    return false;
  }
  if (state.user_score / state.questions.length > 0.4) {
    return true;
  } else {
    return false;
  }
}

const mapStateToProps = (state) => ({
  user_name: state.user_name,
  user_score: state.user_score,
  total_score: state.questions.length,
  pass: isUserPass(state),
});

const mapDispatchToProps = (dispatch) => ({
  modifyDataAction: (payload) => dispatch(modifyDataAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);
