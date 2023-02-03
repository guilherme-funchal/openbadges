import React, { useState, useEffect, useRef } from "react";
import Swal from 'sweetalert2';
import Footer from "./Footer";
import Api from '../Api';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Home() {

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
        iconColor: 'falha',
        customclassName: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(props) {

        var block = {
            "email": email,
            "password": password
        }

        console.log("block->", block)
        var response = await Api.post('user/login', block);
        console.log(response.status);

        if (response.status === 200) {
            localStorage.setItem('login', JSON.stringify(response.data));
            navigate("/Badges");
            navigate(0);           
        } else {
            await Swal.fire('Verifique usuario e senha!');
        }
       
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="login-box">
                        <div>
                            <div className="login-logo">
                                Servidor Openbadges
                            </div>
                            <div className="card">
                                <div className="card-body login-card-body">
                                    <p className="login-box-msg">Entre com o email e senha</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-group mb-3">
                                            <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-envelope" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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


                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
            <pre></pre>
            <Footer />
        </div>
    )
}

