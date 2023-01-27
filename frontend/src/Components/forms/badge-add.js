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
                label="recipientId"
                id="recipientId"
                defaultValue=""
                fullWidth
                size="small"
              />
            </div>
          </div>
          <div className="row">
            <div>
              <TextField
                id="expire"
                label="Expiração"
                type="date"
                defaultValue=" "
                size="small"
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div className="row">
            <div class="text-center">
                <Button style={style} className="btn btn-default" variant="danger" size="sm" onClick={props.handleCloseAdd}>Cancelar</Button>
                <Button style={style} className="btn btn-default" variant="success" size="sm" >Enviar</Button>
            </div>
          </div>

        </div>
      </Box>
    </div>
  )
}