import React from "react";
import { connect } from "react-redux";
// link to help navigate within our site
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions/index";

class StreamList extends React.Component {
  componentDidMount() {
    // fetch streams on load
    this.props.fetchStreams();
  }

  // delete and edit buttons
  renderAdmin(stream) {
    // this is a check to see if you are the user, if you are the buttons appear
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/* string interpolation to get id */}
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          {/* string interpolation to get id*/}
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  //rendering the list of streams
  renderList() {
    // map over all the lists
    return this.props.streams.map(stream => {
      return (
        // each rendered list item will have a unique key attr using the stream's id from the api imported in action creator
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  // rendering the create a stream button
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

// selecting the part of the data from the store that the connected component needs
const mapStateToProps = state => {
  // Object.values get all the values from an object and form an array containing the values from that object in order, emitting the keys
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
