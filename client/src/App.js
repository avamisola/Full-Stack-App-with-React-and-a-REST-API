//import modules and components
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import "./global.css";
import Authenticated from "./components/Authenticated";
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail.js';
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import withContext from "./Context";

//pass context to each component 
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateWithContext = withContext(CreateCourse);
const CourseDetailInWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

//set up routes to each component
export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
      <Route exact path="/" component={Courses} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <PrivateRoute path='/courses/create' component={CreateWithContext} />
        <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} /> 
        <Route exact path='/courses/:id' component={CourseDetailInWithContext} /> 
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);