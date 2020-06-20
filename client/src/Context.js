import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
  };
  constructor() {
    super();
    this.data = new Data();
  };
  render() {
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        updateCourse: this.updateCourse,
        getCourses: this.getCourses
      }
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
  signIn = async (email, password) => {
    const user = await this.data.getUser(email, password);
    if (user !== null) {
      const storedUser = Object.assign({}, user, { email, password});
      this.setState(() => {
        return { authenticatedUser: storedUser };
      });
      Cookies.set("authenticatedUser", JSON.stringify(storedUser), {
        expires: 1
      });
    };
    return user;
  };
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null
      };
    });
    Cookies.remove("authenticatedUser");
  };
  signUp = async (userData) => {
    const response = await this.data('/users', 'POST', userData);
    if (response.status === 201) {
        return [];
    } else if (response.status === 400) {
        return response.json()
          .then(responseData => {
            return responseData.errors;
          })
    } else if (response.status === 200) {
        return response.json()
          .then(responseData => {
            return [ responseData.message ];
          })
    } else {
        throw new Error();
    }
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

}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Provider>
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      </Provider>
    );
  };
}