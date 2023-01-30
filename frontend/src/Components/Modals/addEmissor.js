import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Modal.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';

const Modal = props => {
  const style = { width: '93px' }

  console.log("entrei no modal!!!")

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
            <h4 className="modal-title">Adicionar Emissor</h4>
          </div>
          <div className="modal-body">
            <Box
              // sx={{
              //     display: 'flex',
              //     alignItems: 'center',
              //     '& > :not(style)': { m: 2 },
              // }}
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
            >
              <div>
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
                      label="Descrição"
                      id="description"
                      defaultValue=""
                      fullWidth
                      size="small"
                    />
                  </div>
                  <div>
                    <TextField
                      style={{ width: '95%' }}
                      label="Imagem"
                      id="image"
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
                      label="Email"
                      id="email"
                      defaultValue=""
                      fullWidth
                      size="small"
                    />
                  </div>
                </div>
                <div>
                  <TextField
                    style={{ width: '95%' }}
                    label="Dominio"
                    id="domain"
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
                    label="URL"
                    id="url"
                    defaultValue=""
                    fullWidth
                    size="small"
                  />
                </div>
                <div className="row">
                  <div className="text-center">
                    <Button style={style} className="btn btn-default" variant="danger" size="sm" onClick={props.onClose}>Cancelar</Button>
                    <Button style={style} className="btn btn-default" variant="success" size="sm" >Enviar</Button>
                  </div>
                </div>

              </div>
            </Box>
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