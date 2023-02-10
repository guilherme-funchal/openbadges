import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button,Col } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
// import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

function ModalAddIssuer(props) {

  var login = localStorage.getItem('login');
  var token = JSON.parse(login);

  const [userProfile, setProfile] = useState("");

  const [current, setCurrent] = useState("");
  const form = useRef(null);

  const [userType, setType] = useState("pf");
  const [userLevel, setLevel] = useState("1");

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
      username: "",
      email: "",
      type: "",
      image: "",
      password: "",
      level: ""
    },
  });

  async function submitForm(data) {

    let formdata = new FormData(); 

    formdata.append('file', file);
    
    var login = localStorage.getItem('login');
    var token = JSON.parse(login);

    const headers = {
      'headers': {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'multipart/form-data'
      }
    }
    
    var transactions_result = await Api.post("/files", formdata, headers);

    const block = {
      "name": data.name,
      "description": data.description,
      "createdBy": token.entity_id,
      "image": transactions_result.data.file,
      "email": data.email,
      "url": data.url,
      "domain": data.domain
    };

    console.log("props.header->", props.header)

    await Api.post('issuer', block, props.header);

    await Toast.fire({
      icon: 'success',
      title: 'Emissor incluído'
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
            <form ref={form} noValidate onSubmit={handleSubmit(submitForm)}>
              <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Nome</Form.Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Nome"
                      isInvalid={errors.name}
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
                <Form.Label>Descrição</Form.Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Descrição"
                      isInvalid={errors.description}
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
                <Form.Label>Dominio</Form.Label>
                <Controller
                  name="domain"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Domínio"
                      isInvalid={errors.domain}
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
                <Form.Label>URL</Form.Label>
                <Controller
                  name="url"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="URL"
                      isInvalid={errors.url}
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
            <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Imagem</Form.Label><br></br>
                <input type="file" name="image" onChange={e => setFile(e.target.files[0])} />
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
          <div className="modal-footer">
          </div>
        </div>

      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default ModalAddIssuer;
