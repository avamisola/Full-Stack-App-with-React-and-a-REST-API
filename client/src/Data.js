import config from './config';
import Cookies from 'js-cookie';


export default class Data {
  
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    console.log(credentials)
    return fetch(url, options);
  }

  async getUser(email, password) {
    const response = await this.api('/users', 'GET', null, true, {email, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      this.getUser(user.email, user.password);
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api('/courses', 'GET');
    if (response.status === 200) {
      const courses = await response.json().then(data => data);
      return courses;
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async createCourse (course) {

    let email = null;
    let password = null;
    
    if (Cookies.get('authenticatedUser')) {
      const user = JSON.parse(Cookies.get('authenticatedUser'));
      const hashPassword = Cookies.get('password');
      email = user.email;
      password = atob(JSON.parse(hashPassword));
    }

    const response = await this.api('/courses', 'POST', course, true, {email, password})
    console.log(email, password);
    console.log(response);
    console.log(this.api('/courses', 'POST', course, true, {email, password}));
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async updateCourse(email, password, courseId, course) {
    const response = await this.api('/courses/' + courseId, 'PUT', course, true, {email, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else if (response.status === 403) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(email, password, courseId) {
    const response = await this.api('/courses/' + courseId, 'DELETE', null, true, {email, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 404) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async getCourse(courseId) {
    const response = await this.api('/courses/' + courseId, 'GET');
    if (response.status === 200) {
      const course = await response.json().then(data => data);
      return course;
    }
    else if (response.status === 404) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

}