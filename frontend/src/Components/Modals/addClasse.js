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
      "createdBy": "",
      "issuerId": "",
      "name": "",
      "image": "",
      "description": "",
      "criteriaUrl": "",
      "criteriaNarrative": "",
      "alignmentsTargetName": "",
      "alignmentsTargetUrl": "",
      "alignmentsTargetDescription": "",
      "alignmentsTargetFramework": "",
      "alignmentsTargetCode": "",
      "tags": "",
      "expiresAmount": "",
      "expiresDuration": ""
    },
  });

  async function submitForm(data) {
    let formdata = new FormData();
    formdata.append('file', file);

    var login = localStorage.getItem('login');
    var token = JSON.parse(login);

    var headers = {
      'headers': {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'multipart/form-data'
      }
    }
    
    var transactions_result = await Api.post("/files", formdata, headers);

    headers = {
      'headers': {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      }
    }

    const block = {
      "createdBy": token.entity_id,
      "issuerId": props.entityId,
      "name": data.name,
      "image": transactions_result.data.file,
      "description": data.description,
      "criteriaUrl": data.criteriaUrl,
      "criteriaNarrative": data.criteriaNarrative,
      "alignmentsTargetName": data.alignmentsTargetName,
      "alignmentsTargetUrl": data.alignmentsTargetUrl,
      "alignmentsTargetDescription": data.alignmentsTargetDescription,
      "alignmentsTargetFramework": data.alignmentsTargetFramework,
      "alignmentsTargetCode": data.alignmentsTargetCode,
      "tags": data.tags,
      "expiresAmount": data.expiresAmount,
      "expiresDuration": data.expiresDuration
    };

    await Api.post('badgeclass', block, headers);

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
            <div>
              <form ref={form} noValidate onSubmit={handleSubmit(submitForm)}>
                <Tabs
                  defaultActiveKey="1"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >

                  <Tab eventKey="1" title="Básico">

                    <div>
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
                              size="sm"
                              placeholder="Nome"
                              defaultValue=""
                            />
                          )}
                        />
                      </Form.Group>
                      <br></br>

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
                              as="textarea"
                              size="sm"
                              rows={3}
                              placeholder="Descrição"
                              defaultValue=""
                            />
                          )}
                        />
                      </Form.Group>
                      <br></br>

                      <Form.Group as={Col} md="20" controlId="validationCustom01">
                        <Form.Label>Url</Form.Label>
                        <Controller
                          name="criteriaUrl"
                          control={control}
                          rules={{ required: false }}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              size="sm"
                              placeholder="Documento descrevendo Critérios"

                            />
                          )}
                        />
                      </Form.Group>
                      <br></br>

                      <Form.Group as={Col} md="20" controlId="validationCustom01">
                        <Form.Label>Narrativa do critério</Form.Label>
                        <Controller
                          name="criteriaNarrative"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              as="textarea"
                              rows={3}
                              size="sm"
                              type="text"
                              rules={{ required: false }}
                              placeholder="Critérios"
                            />
                          )}
                        />
                      </Form.Group>
                      <br></br>
                      <Form.Group as={Col} md="20" controlId="validationCustom01">
                        <Form.Label>Tags</Form.Label>
                        <Controller
                          name="tags"
                          control={control}
                          rules={{ required: false }}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              size="sm"
                              placeholder="Tags"
                            />
                          )}
                        />
                      </Form.Group>
                      <br></br>
                      <small id="emailHelp" className="form-text text-muted text-right text-danger">Insira imagem PNG 128 X 128 pixels</small>
                      <Form.Group as={Col} md="20" controlId="validationCustom01">
                        <Form.Label>Imagem</Form.Label><br></br>
                        <input type="file" name="image" onChange={e => setFile(e.target.files[0])} />
                      </Form.Group>


                    </div>

                  </Tab>
                  <Tab eventKey="2" title="Expiração">

                    <div>
                      <Form.Group as={Col} md="20" controlId="validationCustom01">
                        <Form.Label>Tempo de expiração</Form.Label>
                        <Controller
                          name="expiresAmount"
                          control={control}
                          rules={{ required: false }}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              size="sm"
                              placeholder=""

                            />
                          )}
                        />
                      </Form.Group>
                      <br></br>
                      <Form.Group as={Col} md="20" controlId="validationCustom01">
                        <Form.Label>Tempo de duração</Form.Label>
                        <Controller
                          name="expiresDuration"
                          control={control}
                          rules={{ required: false }}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              size="sm"
                              placeholder=""
                            />
                          )}
                        />
                      </Form.Group>
                      <br></br>
                    </div>

                  </Tab>
                  <Tab eventKey="3" title="Alinhamento">
                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                      <Form.Label>Nome</Form.Label>
                      <Controller
                        name="alignmentsTargetName"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            size="sm"
                            placeholder=""
                          />
                        )}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                      <Form.Label>Framework</Form.Label>
                      <Controller
                        name="alignmentsTargetFramework"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            size="sm"
                            placeholder=""
                          />
                        )}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                      <Form.Label>Código</Form.Label>
                      <Controller
                        name="alignmentsTargetCode"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            size="sm"
                            placeholder=""
                          />
                        )}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                      <Form.Label>Descrição</Form.Label>
                      <Controller
                        name="alignmentsTargetDescription"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            size="sm"
                            placeholder=""
                          />
                        )}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} md="20" controlId="validationCustom01">
                      <Form.Label>URL</Form.Label>
                      <Controller
                        name="alignmentsTargetUrl"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            size="sm"
                            placeholder=""
                          />
                        )}
                      />
                    </Form.Group>
                    <br></br>
                  </Tab>

                </Tabs>
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

export default ModalAddIssuer;