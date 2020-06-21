import React from "react";

export default props => {
  const { cancel, errors, submit, submitButtonText, elements } = props;
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }
  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

function ErrorsDisplay({ errors }) {
  let errorList = null;
  if (errors.length) {
      errorList = (
      <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
          <ul>
              { errors.map((item,i) => <li key={i}>{item}</li>) }
          </ul>
          </div>
      </div>
      );
  }
  return errorList;
}