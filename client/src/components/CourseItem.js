import React from 'react';
import {NavLink} from 'react-router-dom';

//html for course items on courses screen
const CourseItem = ({course}) => {
    return(
        <div className="grid-33">
            <NavLink className="course--module course--link" to={`/courses/${course.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
            </NavLink>
        </div>
    );
}

export default CourseItem;