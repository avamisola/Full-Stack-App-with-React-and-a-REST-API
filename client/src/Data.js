import config from './config';

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
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }


  async getCourses() {
    const response = await this.api('/courses', 'GET');
    if (response.status === 200) {
      const courses = await response.json().then(data => data);
      return courses;
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async createCourse (emailAddress, password, course) {
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async deleteCourse(emailAddress, password, courseId) {
    const response = await this.api(courseId, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    } else if (response.status === 404) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async updateCourse(emailAddress, password, courseId, course) {
    const response = await this.api(courseId, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async getCourse(courseId) {
    const response = await this.api('/courses/' + courseId, 'GET');
    if (response.status === 200) {
      const course = await response.json().then(data => data);
      return course;
    } else if (response.status === 404) {
      return response.json().then(data => {
        return data.message;
      });
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      this.getUser(user.emailAddress, user.password);
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else if (response.status === 500) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

}