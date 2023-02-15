import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import Api from '../Api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function Premiados(props) {
    const location = useLocation()
    const [entityId, setEntityId] = useState('');
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [header, setHeader] = useState([' ']);
    const [items, setItems] = useState([' ']);

    const getPremiados = async (entityId) => {

        var login = localStorage.getItem('login');
        var token = JSON.parse(login);
        const response = await Api.get('assertions/' + entityId, header);
        setItems(response.data);

        console.log("response", items);
    }


    useEffect(() => {
        setEntityId(location.state.id);
        getPremiados(location.state.id);
        var login = localStorage.getItem('login');
        var token = JSON.parse(login);
        var header = {
            'headers': {
                'Authorization': 'Bearer ' + token.access_token,
                'Content-Type': 'application/json'
            }
        }
        setHeader(header);
        setToken(token.access_token);

    }, [])

    const style = { width: '85px' }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Premiados com Badge</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to="/emissores">Emissores</Link></li>
                            <li className="breadcrumb-item"><Link to="/classes" key={entityId} state={{ id: entityId }}>Classes</Link></li>
                            <li className="breadcrumb-item active">Premiados</li>
                        </ol>
                    </div>
                </div>

            </div>
            <div className="container">
                <div className="card">
                    <div>
                        <div className="card-header">
                            <h3 className="card-title">Classe Nome...</h3>
                            <div className="card-tools">
                                {/* <div className="input-group input-group-sm" style={{ width: 250 }}>
                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Busca" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-default">
                                            <i className="fas fa-search" />
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Data</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {items.map((data) => {
                                    return(
                                    <tr>
                                        <td>{data.nome}</td>
                                        <td>{data.email}</td>
                                        <td>{data.issueOn}</td>
                                        <td>
                                            <Button style={style} variant="primary" size="sm"><i className="fas fa-ban"></i> Ver</Button>
                                        </td>
                                    </tr> 
                                    )      
                                })}    
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}