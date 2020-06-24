import React, { Component } from 'react';
import ErrorsDisplay from './ErrorsDisplay.js';

export default class UpdateCourse extends Component {

  constructor(props) {
    super(props);
      this.state = {
          title: '',
          description: '',
          estimatedTime: '',
          materialsNeeded: '',
          course_id: '',
          params: this.props.match.params,
          user: [],
          context: this.props.context,
          errors: []
        };
        this.change = this.change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    //set state after mounting
    componentDidMount(){
      fetch(`http://localhost:5000/api/courses/${this.state.params.id}`)
        .then( response => response.json())
        .then( responseData => {
            this.setState({ 
            title: responseData.title, 
            description: responseData.description,
            estimatedTime: responseData.estimatedTime,
            materialsNeeded: responseData.materialsNeeded,
            course_id: responseData.id,
            user: responseData.creator
            });
        return responseData
        })

    }
  
    //click and submit handlers to prevent default action
    handleSubmit = (e) => {
      e.preventDefault();
      this.submit();
    }
    
    handleClick = e => {
      e.preventDefault();
      this.props.history.push(`/courses/${this.state.course_id}`);
    }

    //render update course screen
    render() {
        const {
          title, 
          description, 
          estimatedTime, 
          materialsNeeded,
          errors
        } = this.state;

        return (
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.change} placeholder="Course title..." value={title} /></div>
                <p>By {`${this.state.context.authenticatedUser.name}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" onChange={this.change} placeholder="Course Description..." value={description}>
                </textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={this.change} placeholder="Hours" defaultValue={estimatedTime} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" onChange={this.change} placeholder={materialsNeeded} defaultValue={materialsNeeded}>
                    </textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onClick={this.handleClick}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  //update state based on change event
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
        return {
        [name]: value
        };
    });
  }

  //submit updated course details if authorized user and check for errors
  submit = () => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded,} = this.state
    const { emailAddress, password } = context.authenticatedUser;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: context.authenticatedUser.id
    }
    const path = `/courses/${this.state.course_id}`;
    const currentUserId = Number(this.props.context.authenticatedUser.id)
    const courseUserId = Number(course.userId)
    if (currentUserId === courseUserId) {
      context.data.updateCourse(emailAddress, password, path, course)
        .then( errors => {
          if (errors.length) {
              this.setState({errors});
          } else {
            this.props.history.push('/');
          }
        })
        .catch( err => {
            this.props.history.push('/error');
        })
    } else {
      this.setState({
          errors: ['Not authorized to update course.']
      })
    }
  }
}