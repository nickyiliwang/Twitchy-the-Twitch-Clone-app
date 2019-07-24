// this is a reusable component for StreamEdit and StreamCreate
import React from "react";

// we are using this to validate our form, if the user try to submit the stream without entering anything in the input field, the box will turn red and warning message will appear.
import { Field, reduxForm } from "redux-form";

// stream form doesn't need to use action creators, so no { createStream }, so no need for connect function either
// import { connect } from "react-redux";
// import { createStream } from "../../actions";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // this template string will add error to the className
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    // de-structured formProps
    return (
      // this is the jsx for the form error message
      <div className={className}>
        <label>{label}</label>
        <input
          // onChange={formProps.input.onChange}
          // value={formProps.input.value}
          // replacing with  a shorter syntax:
          // also replaced {...formProps.input with de-structure}
          {...input}
          autoComplete="off"
        />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      // different onsubmit with a handleSubmit callback provided by redux-form
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// helper function for validating formValues
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    // only run if the user didn't enter an title
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate
})(StreamForm);
