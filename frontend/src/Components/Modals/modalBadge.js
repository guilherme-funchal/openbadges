import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Modalbadge(props) {

  const style = { width: '430px' }

  return ReactDOM.createPortal(

    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content" style={style} onClick={e => e.stopPropagation()}>
          {/* <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div> */}
          <div className="modal-body">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
              </div>
            </div>
            <div><br></br></div>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modalbadge;
