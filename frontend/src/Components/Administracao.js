import React from 'react';
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import Footer from './Footer';

export default function Administracao() {

    const style = { width: '85px' }

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Administração</h1>
                <Button style={style} variant="success" size="sm"><i class="fas fa-plus"></i> Novo</Button>
            </div>
            <div className="container">
                <div class="card">
                    <div>
                        <div className="card-header">
                            <h3 className="card-title">Lista de usuários</h3>
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
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Tipo</th>
                                        <th>Perfil</th>
                                        <th>Opção</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>183</td>
                                        <td>John Doe</td>
                                        <td>john@serpro.gov.br</td>
                                        <td>PF</td>
                                        <td>Usuário</td>
                                        <td>
                                        <Button style={style} variant="danger" size="sm"><i class="fas fa-ban"></i> Excluir</Button>
                                        <Button style={style} variant="primary" size="sm"><i class="fas fa-check"></i> Editar</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>184</td>
                                        <td>Maria Silva</td>
                                        <td>maria@serpro.gov.br</td>
                                        <td>PF</td>
                                        <td>Administrador</td>
                                        <td>
                                        <Button style={style} variant="danger" size="sm"><i class="fas fa-ban"></i> Excluir</Button>
                                        <Button style={style} variant="primary" size="sm"><i class="fas fa-check"></i> Editar</Button>    
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