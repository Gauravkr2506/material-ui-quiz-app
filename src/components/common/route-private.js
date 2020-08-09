import React from "react";
import { Route, Redirect } from "react-router-dom";

const RoutePrivate = ({
  component: Component,
  is_authenticated,
  to,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        is_authenticated ? <Component {...props} /> : <Redirect to={to} />
      }
    />
  );
};

RoutePrivate.defaultProps = {
  to: "/",
};

export default RoutePrivate;
