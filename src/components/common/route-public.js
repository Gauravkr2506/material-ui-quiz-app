import React from "react";
import { Route, Redirect } from "react-router-dom";

const RoutePublic = ({
  component: Component,
  is_authenticated,
  to,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        is_authenticated ? <Redirect to={to} /> : <Component {...props} />
      }
    />
  );
};

RoutePublic.defaultProps = {
  to: "/questions",
};

export default RoutePublic;
