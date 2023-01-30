import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Modal.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

const Modal = props => {
  const style = { width: '93px' }

  useEffect(() => {
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Adicionar Classe</h4>
          </div>
          <div className="modal-body">
          <Box
        // sx={{
        //     display: 'flex',
        //     alignItems: 'center',
        //     '& > :not(style)': { m: 2 },
        // }}
        // sx={{
        //   '& .MuiTextField-root': { m: 1, width: '25ch' },
        // }}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <div className="card card-primary card-tabs">
            <div className="card-header p-0 pt-1">
              <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="custom-tabs-one-adv-tab" data-toggle="pill" href="#custom-tabs-one-adv" role="tab" aria-controls="custom-tabs-one-adv" aria-selected="false">Alinhamento</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="custom-tabs-one-exp-tab" data-toggle="pill" href="#custom-tabs-one-exp" role="tab" aria-controls="custom-tabs-one-exp" aria-selected="false">Expiração</a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content" id="custom-tabs-one-tabContent">
                <div className="tab-pane fade active show" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                  <div className="row">
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Nome"
                        id="name"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div>

                      <TextField
                        style={{ width: '95%' }}
                        id="description"
                        label="Descrição"
                        multiline
                        rows={4}
                        defaultValue=""
                      />
                    </div>

                    <div>
                    <small id="emailHelp" className="form-text text-muted text-right text-danger">Insira imagem PNG 128 X 128 pixels</small>
                      <TextField
                        style={{ width: '95%' }}
                        type="file"
                        label=""
                        id="image"
                        defaultValue=""
                        fullWidth
                        multiple
                        size="normal"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Url de Criterio"
                        id="criteriaUrl"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                  </div>
                  <small id="emailHelp" className="form-text text-muted text-right text-danger">Pode ser usado HTML</small>
                  <div>
                    <TextField
                      style={{ width: '95%' }}
                      id="criteriaNarrative"
                      label="Narrativa de critério"
                      multiline
                      rows={7}
                      defaultValue=""
                    />
                  

                  </div>
                  <div className="row">
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Tags"
                        id="tags"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                  </div>
                </div>


                <div className="tab-pane fade" id="custom-tabs-one-adv" role="tabpanel" aria-labelledby="custom-tabs-one-adv-tab">
                  <div className="row">
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Nome"
                        id="alignmentsTargetName"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Framework"
                        id="alignmentsTargetFramework"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Código"
                        id="alignmentsTargetCode"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Descrição"
                        id="alignmentsTargetDescription"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="URL"
                        id="alignmentsTargetUrl"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="custom-tabs-one-exp" role="tabpanel" aria-labelledby="custom-tabs-one-exp-tab">
                  <div className="row">
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Tempo de expiração"
                        id="expiresAmount"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                    <div>
                      <TextField
                        style={{ width: '95%' }}
                        label="Tempo de duração"
                        id="expiresDuration"
                        defaultValue=""
                        fullWidth
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>

        <div className="row">

          <div className="row">
            <div className="text-center">
              <Button style={style} className="btn btn-default" variant="danger" size="sm" onClick={props.onClose}>Cancelar</Button>
              <Button style={style} className="btn btn-default" variant="success" size="sm" >Enviar</Button>
            </div>
          </div>

        </div>
      </Box >
          </div>
          <div className="modal-footer">

          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;