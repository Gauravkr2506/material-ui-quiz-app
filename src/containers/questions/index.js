import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { getQuestionsAction, setUserAnswersAction } from "./../../store/action";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  horizontal_content: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

function Questions(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [users_answer, setUsersAnswer] = React.useState([]);
  const [current_question_index, setCurrentQuestionIndex] = React.useState(0);

  useEffect(() => {
    props.getQuestionsAction();
  }, []);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let new_user_answer = [...users_answer];
    new_user_answer[current_question_index] = value;

    setValue(users_answer[current_question_index + 1]);
    setUsersAnswer(new_user_answer);
    if (current_question_index >= props.questions.length - 1) {
      props.setUserAnswersAction(new_user_answer);
      props.history.replace("/result");
      // props.history.index = 0;
      // browserHistory.replace("/result");
      return;
    }
    setCurrentQuestionIndex(current_question_index + 1);
  };

  const previousQuestion = () => {
    if (current_question_index === 0) {
      return;
    }
    setValue(users_answer[current_question_index - 1]);

    setCurrentQuestionIndex(current_question_index - 1);
  };

  return (
    <Paper>
      {props.questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          <div style={{ padding: 10 }}>
            <div>
              {`Question ${current_question_index + 1}/${
                props.questions.length
              }:`}{" "}
            </div>
          </div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel>
              <Typography style={{ paddingBottom: 20 }} variant="h5">
                {props.questions[current_question_index].question}
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              {props.questions[current_question_index].options.map(
                (option, index) => (
                  <FormControlLabel
                    key={option + index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                )
              )}
            </RadioGroup>
            <div
              style={{ paddingTop: 20 }}
              className={classes.horizontal_content}
            >
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={previousQuestion}
                disabled={current_question_index === 0}
              >
                Previous
              </Button>

              <Button
                type="submit"
                variant="outlined"
                color={
                  props.questions.length - 1 <= current_question_index
                    ? "secondary"
                    : "primary"
                }
                className={classes.button}
              >
                {props.questions.length - 1 <= current_question_index
                  ? "Submit"
                  : "Next"}
              </Button>
            </div>
          </FormControl>
        </form>
      )}
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});
const mapDispatchToProps = (dispatch) => ({
  getQuestionsAction: () => dispatch(getQuestionsAction()),
  setUserAnswersAction: (users_answer) =>
    dispatch(setUserAnswersAction(users_answer)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
