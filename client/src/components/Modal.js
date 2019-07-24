// this component will be placed at the root level/ attach it to the body because we don't want to change/alter any existing css rules, we are going to be using a portal to have the Modal on top of our existing components

import React from "react";
import ReactDOM from "react-dom";

// the createPortal function takes in 2 args, one is the JSX that you want to render and the second is the which reactDOM you want to render it to, in this case we want to render it to a new #modal div, instead of the #root div

// portals are for modals or when the root html isn't created by your react application

const Modal = props => {
  return ReactDOM.createPortal(
    // this onClick uses the history to redirect the user to the root route, and dismisses the delete modal, programmatic navigation
    <div
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => {
          // this onclick ensures nothing bubbled up to the above click event
          e.stopPropagation();
        }}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
