import React from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { UserJoin } from "./../../store/action";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function UserLogin(props) {
  const classes = useStyles();

  function ValidateForm(e) {
    e.preventDefault();
    props.UserJoin(e.target.elements.user_name.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          We need your username to start
        </Typography>
        <form className={classes.form} onSubmit={ValidateForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="text"
            label="User Name"
            name="user_name"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Join
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  UserJoin: (user_name) => dispatch(UserJoin(user_name)),
});

export default connect(null, mapDispatchToProps)(UserLogin);
