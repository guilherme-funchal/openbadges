import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button, Col, Modal } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { Controller, useForm } from "react-hook-form";
// import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

function ModalEditIssuer(props) {
  const form = useRef(null);
  const [file, setFile] = useState("empty");
  const [value, setValues] = useState("");


  let id = props.items[0]?.id;
  let name = props.items[0]?.name;
  let description = props.items[0]?.description;
  let email = props.items[0]?.email;
  let url = props.items[0]?.url;
  let domain = props.items[0]?.badgrDomain;
  let image =  props.items[0]?.image;
  let staffId = props.items[0]?.staffId;

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
      id: "",
      name: "",
      description: "",
      email: "",
      url: "",
      domain: "",
      image: "",
      staffId: ""
    },
  });

  async function submitForm() {
    const block = {
      "id": id,
      "name": name,
      "description": description,
      "image": image,
      "staffId": staffId,
      "email": email,
      "url": url,
      "domain": domain
    };
    var response = await Api.patch('issuer', block, props.header);
    props.onClose();
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
            <h4 className="modal-title">Editar Emissor</h4>
          </div>
          <div className="modal-body">
            <form ref={form} noValidate onSubmit={handleSubmit(submitForm)}>
              <Form.Group as={Col} md="20">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nome"
                  defaultValue={props.items[0]?.name}
                  onChange={(e) => name = e.target.value}
                />
              </Form.Group>
              <br></br>
              <Form.Group as={Col} md="20">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Descrição"
                  defaultValue={props.items[0]?.description}
                  onChange={(e) => description = e.target.value}
                />
              </Form.Group>
              <br></br>
              <Form.Group as={Col} md="20">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={props.items[0]?.email}
                  onChange={(e) => email = e.target.value}
                />
              </Form.Group>
              <br></br>
              <Form.Group as={Col} md="20">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  id="url"
                  name="url"
                  placeholder="URL"
                  defaultValue={props.items[0]?.url}
                  onChange={(e) => url = e.target.value}
                />
              </Form.Group>
              <br></br>
              <Form.Group as={Col} md="20">
                <Form.Label>Dominio</Form.Label>
                <Form.Control
                  type="text"
                  id="domain"
                  name="domain"
                  placeholder="Dominio"
                  defaultValue={props.items[0]?.badgrDomain}
                  onChange={(e) => domain = e.target.value}
                />
              </Form.Group>
              <br></br>
              {/* <Form.Group as={Col} md="20">
                <Form.Label>Arquivo atual : {props.items[0]?.image}</Form.Label><br></br>
                <Form.Label></Form.Label><br></br>
                <input
                  type="file"
                  name="image"
                  defaultValue=""
                  onChange={e => setFile(e.target.files[0])}
                />
                <br></br>
              </Form.Group> */}
              <div className="text-right">
                <Button variant="danger" style={style} onClick={props.onClose} size="sm">
                  <i class="fas fa-ban"></i>
                </Button>
                <Button variant="primary" style={style} type="submit" size="sm">
                  <i class="fas fa-check"></i>
                </Button>
              </div>
              <br></br>
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

export default ModalEditIssuer;