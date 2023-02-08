import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Form, Button, Col  } from "react-bootstrap";
import Api from '../../Api';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
// import 'bootstrap/dist/css/bootstrap.min.css';


function ModalEditEmissor (props) {

  const form = useRef(null);
  const [file, setFile] = useState("");
  const [value, setValues] = useState("");

  const id = props.items[0]?.id;
  var name =  props.items[0]?.name;
  var description =  props.items[0]?.description;
  var email =  props.items[0]?.email;
  var url =  props.items[0]?.url;
  var domain =  props.items[0]?.badgrDomain;
  var image =  props.items[0]?.image;
  var staffId = props.items[0]?.staffId;

  useEffect(() => {

  }, [])

  // const onChange = (e) => {
  //   setValues({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   });
  // };

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
    //control,
    handleSubmit,
    //formState: { errors },
  } = useForm({
    defaultValues: {
      id : "",
      name :  "",
      description :  "",
      email :  "",
      url :  "",
      domain :  "",
      image :  "",
      staffId : ""
    },
  });

  async function submitForm(data) {
    console.log("nome->", name);

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

      var old_image = image;
      console.log("image->", image);
     

      var transactions_result = await Api.post("/files", formdata, headers);
      image = transactions_result.data.file;
      console.log(image);

      var remove_result = await Api.delete("/files/" + old_image, props.header);
      console.log(remove_result);

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
  
      console.log("props.header->", props.header)
  
      await Api.patch('issuer', block, props.header);
  

    } else {
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
  
      await Api.patch('issuer', block, props.header);

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
              <Form.Group as={Col} md="20">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nome"
                  defaultValue={props.items[0]?.name}
                  onChange={(e) => name=e.target.value}
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
                  onChange={(e) => description=e.target.value}
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
                  onChange={(e) => email=e.target.value}
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
                  onChange={(e) => url=e.target.value}
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
                  onChange={(e) => domain=e.target.value}
                />
              </Form.Group>
              <br></br>
              <Form.Group as={Col} md="20">
                <Form.Label>Arquivo atual : {props.items[0]?.image}</Form.Label><br></br>
                <Form.Label></Form.Label><br></br>
                <input
                  type="file"
                  name="image"
                  defaultValue=""
                  onChange={e => setFile(e.target.files[0])}
                />
                <br></br>
              </Form.Group>
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

export default ModalEditEmissor;