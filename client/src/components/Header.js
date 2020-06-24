import React from "react";
import { Link } from "react-router-dom";

//create the header for link to main page and signing in
export default ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
        <nav>
          {authUser ?
            <React.Fragment>
              <span>Welcome, {authUser.name}!</span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          }
        </nav>
      </div>
    </div>
  );
};