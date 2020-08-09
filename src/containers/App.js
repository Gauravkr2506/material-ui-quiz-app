import React from "react";
import { connect } from "react-redux";
import Header from "./../components/ui/Header";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "../components/ui/Theme";
import Loader from "./../components/common/loader";
import PublicRoute from "./../components/common/route-public";
import PrivateRoute from "./../components/common/route-private";

import UserLogin from "./user-login";
import Questions from "./questions";
import Result from "./result";

const useStyles = makeStyles((theme) => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
  },
}));

function App(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container>
        <Box my={2}>
          <div className={classes.toolBarMargin}></div>
          <Router>
            <div>
              <Loader is_loader_on={props.is_loader_on} />
              <Switch>
                <PublicRoute
                  is_authenticated={props.user_name}
                  path="/"
                  exact
                  component={UserLogin}
                />
                <PrivateRoute
                  is_authenticated={props.user_name}
                  path="/questions"
                  exact
                  component={Questions}
                />
                <PrivateRoute
                  is_authenticated={props.user_name}
                  path="/result"
                  exact
                  component={Result}
                />
              </Switch>
            </div>
          </Router>
        </Box>
      </Container>
      {!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && (
        <footer
          style={{
            textAlign: "center",
            padding: 3,
            backgroundColor: "DarkSalmon",
            color: "white",
            position: "absolute",
            left: 0,
            width: "100%",
            bottom: 0,
          }}
        >
          <p>
            Faceslabs@{new Date().getFullYear()}
            <br />
            <a href="mailto:gauravkr2506@gmail.com">gauravkr2506@gmail.com</a>
          </p>
        </footer>
      )}
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  user_name: state.user_name,

  is_loader_on: state.is_loader_on,
});
export default connect(mapStateToProps)(App);
