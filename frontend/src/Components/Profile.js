import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import Api from '../Api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function Profile(props) {
    
    const style = { width: '85px' }

    useEffect(() => {
       
    }, [])

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Perfil do usuário</h1>
                    </div>
                    <div className="col-sm-6">
                    </div>
                </div>

            </div>
            <div className="container">
                <div className="card">
                    <div>
                        <div className="card-header">
                            <h3 className="card-title">Perfil de usuário...</h3>
                            <div className="card-tools">
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}