import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button, Col } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
// import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ModalAddBadge(props) {
  var login = localStorage.getItem('login');
  var token = JSON.parse(login);
  const form = useRef(null);
  const [file, setFile] = useState('');

  useEffect(() => {

  }, [])

  const style = { width: '45px' }

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'green',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });

  var profile = "";
  var type = "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "issuerId": "",
      "badgeclassId": "",
      "recipientId": "",
      "expires": ""
    },
  });

  async function submitForm(data) {
    var headers = {
      'headers': {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      }
    }

    const response = await Api.get('users/email/' + data.email, headers);

    const block = {
      "issuerId" : props.issuerId,
      "badgeclassId" : props.entityId,
      "recipientId" : response.data.usuario.entity_id,
      "expires" : data.expires
    };

    await Api.post('assertions', block, headers);

    await Toast.fire({
      icon: 'success',
      title: 'Badge enviado'
    });

    props.onClose();
  }


  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal">
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Adicionar usuário</h4>
          </div>

          <div className="modal-body">
            <div>
            <form ref={form} noValidate onSubmit={handleSubmit(submitForm)}>
              <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Email"
                      isInvalid={errors.email}
                    />
                  )}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    <Form.Control.Feedback type="invalid">
                      O campo é requerido
                    </Form.Control.Feedback>
                  </div>
                )}
              </Form.Group>
              <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Expiração</Form.Label>
                <Controller
                  name="expires"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Expiração"
                      isInvalid={errors.expires}
                    />
                  )}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    <Form.Control.Feedback type="invalid">
                      O campo é requerido
                    </Form.Control.Feedback>
                  </div>
                )}
              </Form.Group>
              <br></br>
              <div className="text-right">
                <Button style={style} variant="danger" onClick={props.onClose} size="sm">
                <i class="fas fa-ban"></i>
                </Button>
                <Button style={style} variant="primary" type="submit" size="sm">
                <i class="fas fa-check"></i>
                </Button>
              </div>
            </form>
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

export default ModalAddBadge;