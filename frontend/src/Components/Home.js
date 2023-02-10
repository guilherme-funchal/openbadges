import { useState, useEffect, useRef } from "react";
import React from 'react';
import Header from './Header';
import Swal from 'sweetalert2';
import Footer from "./Footer";
import Api from '../Api';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

export default function Home() {

    const style = { width: '100px' }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    function delEmissor() {
        Sucesso.fire({
            icon: 'success',
            title: 'Usuário conectado'
        })
    }

    const navigate = useNavigate();

    const Sucesso = Swal.mixin({
        toast: true,
        position: 'center',
        iconColor: 'green',
        customclassName: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });

    const Falha = Swal.mixin({
        toast: true,
        position: 'center',
        iconColor: 'red',
        customclassName: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 4500,
        timerProgressBar: true
    });

    const handleSubmit = async event => {

        event.preventDefault();

        var block = {
            "email": email,
            "password": password
        }

        var response = await Api.post('user/login', block);
        console.log(response.status);

        if (response.status === 200) {

            localStorage.setItem('login', JSON.stringify(response.data));
            navigate("/Badges");
            navigate(0);   
        } 
        
        if  (response.status === 201) {
            Falha.fire({
                icon: 'error',
                title: 'Usuário ou senha inválido'
            })
        }
       
    }


    return (
        <div>
            <div class="login-box"></div>
            <div className="row align-items-left">
                <div className="col-sm"></div>
                <div className="col-sm"></div>
                <div className="col-sm">
                    {/* <div className="login-box"> */}
                        <div>
                            <div className="login-logo">
                                Servidor Openbadges
                            </div>
                            <div className="card">
                                <div className="card-body login-card-body">
                                    <p className="login-box-msg">Entre com o email e senha</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-group mb-3">
                                            <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-envelope" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-lock" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <br /><br /><br />
                                            <div className="col-4">
                                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                                            </div>
                                        </div>
                                    </form>
                                    <div> <img className="img-fluid" src="dist/img/banner.jpg" width="100%" height="100%" alt="imagem"></img></div>
                                    <br />
                                    <p className="mb-1">
                                        <a href="">Recuperar a senha</a>
                                    </p>
                                    <p className="mb-0">
                                        <a href="" className="text-center">Registrar um novo usuário</a>
                                    </p>
                                </div>
                            </div>
                        </div>


                    {/* </div> */}
                    <div className="col-sm-4"></div>
                </div>
                <div className="col-sm"></div>
                <div className="col-sm"></div>
            </div>
            <pre></pre>

        </div>
    )
}

