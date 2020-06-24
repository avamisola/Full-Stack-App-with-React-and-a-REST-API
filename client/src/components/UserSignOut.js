import React from "react";
import { Redirect } from "react-router-dom";

//handle sign out and redirect to main page
export default ({context}) => {
  context.actions.signOut();
  return <Redirect to="/" />;
};