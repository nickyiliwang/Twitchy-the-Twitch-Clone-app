import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
// wiring up the action for data loading, as well as the editStream action creator
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

// With React-Router, each component needs to be designed to work in isolation, meaning it has to pre-fetch its own data.

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          // redux-form method, we are passing in the stream object obtained from the store as a prop with mapStateToProps
          // lodash pick function Creates an object composed of the picked object properties.
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// takes your application state from the store and passes it to your component as a prop.

// when you have 2 sources of information coming from the StreamEdit props, as well as mapStateToProps, the ownProps arg would also reference the same props from StreamEdit

const mapStateToProps = (state, ownProps) => {
  // we are going into the streams object containing a list of streams, and the keys to the streams are stream Ids
  // after this function runs, the stream prop is created and has the object taken from the state obj with the id taken from the ownProps arg.
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(
  mapStateToProps,
  // passing the action creator into the connect function
  { fetchStream, editStream }
)(StreamEdit);
