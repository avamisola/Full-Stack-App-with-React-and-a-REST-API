import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    this.state = {authenticatedUser: Cookies.getJSON('authenticatedUser') || null};
  }

  render() {
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      data: this.data,
      actions: {
        getCourses: this.getCourses,
        updateCourse: this.updateCourse,
        signIn: this.signIn,
        signOut: this.signOut
      }
    };
    return (<Context.Provider value={value}>{this.props.children}</Context.Provider>);
  }

  getCourses = async () => {
    const response = await this.callApi('/courses', 'GET', null);
    if (response.status === 200) {
        return response.json()
            .then(responseData => responseData);
    } else {
        throw new Error();
    }
  }

  signIn = async (email, password) => {
    const user = await this.data.getUser(email, password);
    console.log ( user )
    if (user !== null) {
      const userObject = Object.assign({}, user, { email, password });
      this.setState(() => {
        return { authenticatedUser: userObject };
      });
      Cookies.set("authenticatedUser", JSON.stringify(userObject), { expires: 1 });
      Cookies.set("password", JSON.stringify(btoa(password)), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState(() => {
      return { authenticatedUser: null };
    });
    Cookies.remove("authenticatedUser");
  }

}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}