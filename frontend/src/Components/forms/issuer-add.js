import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';



export default function Basico(props) {
  const style = { width: '93px' }


  return (
    <div>
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
                <Button style={style} className="btn btn-default" variant="danger" size="sm" onClick={props.handleCloseAdd}>Cancelar</Button>
                <Button style={style} className="btn btn-default" variant="success" size="sm" >Enviar</Button>
            </div>
          </div>

        </div>
      </Box>
    </div>
  )
}