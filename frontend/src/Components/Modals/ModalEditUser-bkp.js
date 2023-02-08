import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button,Col } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

function ModalEditUser(props) {
  const [userProfile, setProfile] = useState("");

  const [current, setCurrent] = useState("");
  const form = useRef(null);

  const [userType, setType] = useState("pf");
  const [userLevel, setLevel] = useState("1");

  var id = props.items.usuario?.id;
  var username = props.items.usuario?.username;
  var email  = props.items.usuario?.email;
  var type  = props.items.usuario?.type;
  var image = props.items.usuario?.image;
  var level = props.items.usuario?.level;

  useEffect(() => {
    console.log("entrei aqui!!!")
 
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
      username: "",
      email: "",
      type: "",
      image: "",
      password: "",
      level: ""
    },
  });

  async function submitForm(data) {
    
    console.log("aqui!!!")
    const block = {
      "username": username,
      "email": email,
      "type": type,
      "image": image,
      "level": level
    };

    console.log("block->", block)
    await Api.put('users/' + id, block, props.header);

    await Toast.fire({
      icon: 'success',
      title: 'Usuário atualizado'
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
            <h4 className="modal-title">Editar usuário</h4>
          </div>
          <div className="modal-body">
            <form ref={form} noValidate onSubmit={handleSubmit(submitForm)}>
              <Form.Group as={Col} md="20" >
                <Form.Label>Nome usuario</Form.Label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={props.items.usuario?.username}
                    placeholder="Username"
                    onChange={(e) => username=e.target.value}
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
              <Form.Group as={Col} md="20" >
                <Form.Label>Email</Form.Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                    type="text"
                    id="email"
                    name="email"
                    defaultValue={props.items.usuario?.email}
                    placeholder="Email"
                    onChange={(e) => email=e.target.value}
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
              <Form.Group as={Col} md="20" >
                <Form.Label>Image</Form.Label>
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                    type="text"
                    id="image"
                    name="image"
                    defaultValue={props.items.usuario?.image}
                    placeholder="Image"
                    onChange={(e) => image=e.target.value}
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
              <Form.Group as={Col} md="20">
                <Form.Label>Estado</Form.Label><br></br>
                <select name="type" 
                  value={type} 
                  onChange={(e) => type=e.target.value}>

                  <option value="pf">Pessoa física</option>
                  <option value="pj">Pessoa jurídica</option>
                </select><br /><br />
            </Form.Group>  
            <Form.Group as={Col} md="20">
                <Form.Label>Estado</Form.Label><br></br>
                <select name="level" value={level} 
                onChange={(e) => level=e.target.value}>
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

export default ModalEditUser;
