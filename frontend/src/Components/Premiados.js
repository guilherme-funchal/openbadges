import React from 'react';
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';

export default function Administracao() {

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
                            <li className="breadcrumb-item"><Link to="/classes">Classes</Link></li>
                            <li className="breadcrumb-item active">Premiados</li>
                        </ol>
                    </div>
                </div>

            </div>
            <div className="container">
                <div class="card">
                    <div>
                        <div className="card-header">
                            <h3 className="card-title">Classe Nome...</h3>
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{ width: 250 }}>
                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Busca" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-default">
                                            <i className="fas fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Data</th>
                                        <th>Opção</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>22/01/2022</td>
                                        <td>
                                            <Button style={style} variant="primary" size="sm"><i class="fas fa-ban"></i> Ver</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Maria Silva</td>
                                        <td>22/01/2022</td>
                                        <td>
                                            <Button style={style} variant="primary" size="sm"><i class="fas fa-ban"></i> Ver</Button>
                                        </td>
                                    </tr>

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