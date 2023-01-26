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
                label="Url de Criterio"
                id="criteriaUrl"
                defaultValue=""
                fullWidth
                size="small"
              />
            </div>
          </div>
          <div>
              <TextField
                style={{ width: '95%' }}
                label="Narrativa"
                id="criteriaNarrative"
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
                label="Nome alinhamento"
                id="alignmentsTargetName"
                defaultValue=""
                fullWidth
                size="small"
              />
            </div>
            <div>
              <TextField
                style={{ width: '95%' }}
                label="Alinhamento Framework"
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
                label="Codigo alinhamento"
                id="alignmentsTargetCode"
                defaultValue=""
                fullWidth
                size="small"
              />
            </div>
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
            <div className="row">
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
                label="Alinhamento URL"
                id="alignmentsTargetUrl"
                defaultValue=""
                fullWidth
                size="small"
              />
            </div>
          <div className="row">
            <div class="text-center">
                <Button style={style} className="btn btn-default" variant="danger" size="sm" >Cancelar</Button>
                <Button style={style} className="btn btn-default" variant="success" size="sm" >Enviar</Button>
            </div>
          </div>

        </div>
      </Box>
    </div>
  )
}