import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button,Col } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

function ModalAddUser(props) {

  const [userProfile, setProfile] = useState("");

  const [current, setCurrent] = useState("");
  const form = useRef(null);

  const [userType, setType] = useState("pf");
  const [userLevel, setLevel] = useState("1");

  useEffect(() => {
    var data = moment()
      .utcOffset('-03:00')
      .format('DD/MM/YYYY hh:mm:ss a');
    setCurrent(data);

  }, [])


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
      user_id: "",
      profile: "",
      desc: "",
      name: "",
      email: "",
      type: "",
      doc: "",
      created_at: "",
      updated_at: "",
      last_login: "",
      image: ""
    },
  });

  async function submitForm(data) {

    console.log(props.header)

    const block = {
      "username": data.username,
      "email": data.email,
      "type": userType,
      "image": data.image,
      "password": data.password,
      "level": userLevel
    };

    console.log("block->", block)
    await Api.post('users', block, props.header);

    await Toast.fire({
      icon: 'success',
      title: 'Usuário incluído'
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
                <Form.Label>Nome usuario</Form.Label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Nome usuario"
                      isInvalid={errors.username}
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
                <Form.Label>Image</Form.Label>
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Imagem"
                      isInvalid={errors.image}
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
                <Form.Label>Senha</Form.Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Senha"
                      isInvalid={errors.password}
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
                <Form.Label>Estado</Form.Label><br></br>
                <select name="type" value={type} onChange={state => setType(state.target.value)}>
                  <option value="pf">Pessoa física</option>
                  <option value="pj">Pessoa jurídica</option>
                </select><br /><br />
            </Form.Group>  
            <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Estado</Form.Label><br></br>
                <select name="level" value={userLevel} onChange={state => setLevel(state.target.value)}>
                  <option value="1">Usuário</option>
                  <option value="0">Administrador</option>
                </select><br /><br />
            </Form.Group>  
              
              <br></br>
              <div className="text-right">
                <Button variant="danger" onClick={props.onClose} size="sm">
                <i class="fas fa-trash"> Cancela</i>
                </Button>
                <Button variant="primary" type="submit" size="sm">
                <i class="fas fa-check"> Salvar</i>
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

export default ModalAddUser;
