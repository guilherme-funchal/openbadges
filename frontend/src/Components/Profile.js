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
                            <div class="card card-success">
                                <div>
                                    <div className="card-header">
                                        <h3 className="card-title">Quick Example</h3>
                                    </div>
                                    <form>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputFile">File input</label>
                                                <div className="input-group">
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="exampleInputFile" />
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                                    </div>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">Upload</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>







                            </div>

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            </div>
            )
}