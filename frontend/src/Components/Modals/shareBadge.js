import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button, Col } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { useCopyToClipboard } from 'react-use';

export default function ModalShareBadge(props) {

  const [text, setText] = React.useState('');
  const [state, copyToClipboard] = useCopyToClipboard();

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
        <div className="modal-content" style={{ width: '600px' }} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Compartilhar Badge</h4>
          </div>
          <div className="modal-body">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img className="profile-user-img img-fluid img-circle" src={props.image} alt="badge" />
                </div>
                <h3 className="profile-username text-center"></h3>
                <p className="text-muted text-center"></p>
                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <div>
                      <small id="emailHelp" className="form-text text-muted text-left text-danger">Incluir o link abaixo na sua rede social</small><br></br>
                      <small id="emailHelp" className="form-text text-left"><b>Link : </b></small><small id="emailHelp" className="form-text text-center text-danger">{props.id}</small>
                      <br></br><br></br>
                      <Button variant="success" style={style} onClick={() => { copyToClipboard(props.id); props.onClose(); }} size="sm">
                        <i class="fas fa-copy"></i>
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
          <div className="modal-footer">

          </div>
        </div>

      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

