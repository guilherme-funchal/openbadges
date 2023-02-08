import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button, Col } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

function ModalViewIssuer(props) {
  var baseURL = process.env.REACT_APP_REST_HOST+ '/files/'

  console.log(props.items);

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
            <h4 className="modal-title">Ver emissor</h4>
          </div>
          <div className="modal-body">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img className="profile-user-img img-fluid img-circle" src={baseURL + props.items[0]?.image} alt="User profile picture" />
                </div>
                <h3 className="profile-username text-center">{props.items[0]?.name}</h3>
                <p className="text-muted text-center">{props.items[0]?.description}</p>
                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <b>Email</b> <a className="float-right">{props.items[0]?.email}</a>
                  </li>
                  <li className="list-group-item">
                    <b>URL</b> <a className="float-right">{props.items[0]?.url}</a>
                  </li>
                  <li className="list-group-item">
                    <b>Dominio</b> <a className="float-right">{props.items[0]?.badgrDomain}</a>
                  </li>
                  <li className="list-group-item">
                    <b>OpenbadgeID</b> <a className="float-right">{props.items[0]?.openBadgeId}</a>
                  </li>
                  {/* <li className="list-group-item">
                    <b>Criado em </b> <a className="float-right">{resultado}</a>
                  </li> */}
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

export default ModalViewIssuer;
