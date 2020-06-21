//import modules and components
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import "./global.css";
import Header from "./components/Header";
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from './components/CourseDetail.js';
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import withContext from "./Context";

//pass context to each component 
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

//set up routes to each component
export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute path='/courses/create' component={CreateCourseWithContext} />
        <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} /> 
        <Route exact path='/courses/:id' component={CourseDetailWithContext} /> 
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
      </Switch>
    </div>
  </Router>
);