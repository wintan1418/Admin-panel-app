import React from "react";
import User from "../models/user/user";
import { Redirect, Route } from "react-router-dom";
import {
  isRolePresent,
  // redirectIfInvalidTenant,
} from "../utilities/generalUtility";

export default function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => {
        console.log(route);
        // Check authentication
        var userToken = User.isTokenAvailable();
        console.log("user token available: ", userToken);
        console.log("what is? ", route.authenticated && userToken);
        if (!route.authenticated || (route.authenticated && userToken)) {
          // Check domain prefix
          console.log("at first here: ", route.authenticated);

          // redirectIfInvalidTenant();
          if (
            (route.path === "/login" ||
              route.path === "/forgot-password" ||
              route.path === "/set-password") &&
            User.isTokenAvailable()
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            );
          }
          // Check roles
          const hasRole = isRolePresent(route.roles, User.getRole());
          // alert("gaga");

          if (hasRole) {
            // console.log("llkd-> : ", route)
            // alert("hasRole");
            const component = (
              <route.component {...props} route={route}></route.component>
            );
            return route.layout ? (
              <route.layout>{component}</route.layout>
            ) : (
              component
            );
          } else {
            // alert("hasRole - else");
            return (
              <Redirect
                to={{
                  pathname: "/unauthorized",
                }}
              />
            );
          }
        } else {
          // alert("then here >>> ???")
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
