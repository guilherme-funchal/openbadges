import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button, Col } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

function ModalShareBadge(props) {

  useEffect(() => {

  }, [])

  const style = { width: '45px' }

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal">
        <div className="modal-content" style={{width: '650px'}} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Compartilhar Badge</h4>
          </div>
          <div className="modal-body">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img className="profile-user-img img-fluid img-circle" src="" alt="User profile picture" />
                </div>
                <h3 className="profile-username text-center"></h3>
                <p className="text-muted text-center"></p>
                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <b>Email</b> <a className="float-right"></a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
          <div className="modal-footer">
            <Button variant="danger" style={style} onClick={props.onClose} size="sm">
              <i class="fas fa-ban"></i>
            </Button>
          </div>
        </div>

      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default ModalShareBadge;
