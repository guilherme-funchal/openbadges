import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button, Col, Modal } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
// import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

function ModalEditUser(props) {

  // const [userProfile, setProfile] = useState("");
  // const [current, setCurrent] = useState("");
  const form = useRef(null);

  const [userType, setType] = useState(props.items.usuario?.type);
  const [userLevel, setLevel] = useState(props.items.usuario?.level);

  const [file, setFile] = useState("");

  var id = props.items.usuario?.id;
  var username = props.items.usuario?.username;
  var email = props.items.usuario?.email;
  var image = props.items.usuario?.image;

  useEffect(() => {

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
      level: ""
    },
  });

  async function submitForm(data) {

    if (file !== "empty") {
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

      var  old_image = image;
     

      var transactions_result = await Api.post("/files", formdata, headers);
      image = transactions_result.data.file;
      console.log(image);

      var remove_result = await Api.delete("/files/" + old_image, props.header);
      console.log(remove_result);

      const block = {
        "username": username,
        "email": email,
        "type": userType,
        "image": image,
        "level": userLevel
      };
  
      await Api.put('users/' + id, block, props.header);

      
    } else {

      const block = {
        "username": username,
        "email": email,
        "type": userType,
        "image": image,
        "level": userLevel
      };
      await Api.put('users/' + id, block, props.header);
    }

    

    await Toast.fire({
      icon: 'success',
      title: 'Usuário atualizado'
    });

    props.onClose();
    setFile("empty");
  }

  const style = { width: '45px' }

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
              <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Nome usuario</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Nome usuario"
                  defaultValue={props.items.usuario?.username}
                  onChange={(e) => username = e.target.value}
                />
              </Form.Group>
              <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={props.items.usuario?.email}
                  onChange={(e) => email = e.target.value}
                />
              </Form.Group>
              <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Tipo</Form.Label><br></br>
                <select name="type" value={userType} onChange={type => setType(type.target.value)}>
                  <option value="pf">Pessoa física</option>
                  <option value="pj">Pessoa jurídica</option>
                </select><br /><br />
              </Form.Group>
              <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Estado</Form.Label><br></br>
                <select name="level" value={userLevel} onChange={level => setLevel(level.target.value)}>
                  <option value="1">Usuário</option>
                  <option value="0">Administrador</option>
                </select><br /><br />
              </Form.Group>
              <Form.Group as={Col} md="20" controlId="validationCustom01">
                <Form.Label>Arquivo atual : {props.items.usuario?.image}</Form.Label><br></br>
                <Form.Label></Form.Label><br></br>
                <input
                  type="file"
                  name="image"
                  defaultValue={props.items.usuario?.image}
                  onChange={e => setFile(e.target.files[0])}
                />
                <br></br>
              </Form.Group>

              <br></br>
              <div className="text-right">
                <Button variant="danger" style={style} onClick={props.onClose} size="sm">
                  <i class="fas fa-ban"></i>
                </Button>
                <Button variant="primary" style={style} type="submit" size="sm">
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

export default ModalEditUser;