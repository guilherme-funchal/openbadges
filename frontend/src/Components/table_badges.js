import React from 'react';
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";


export default function TableBadges() {

    const style = { width: '85px' }

    return (
        <div className="container">
            <div class="card">
                <div>
                    <div className="card-header">
                        <h3 className="card-title">Tabela</h3>
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
                                    <th>Image</th>
                                    <th>Descrição</th>
                                    <th>Emissor</th>
                                    <th>Data</th>
                                    <th>Compartilhar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img width="40" src="../../dist/img/emissor1.png" /></td>
                                    <td>P01 - Encarregado de Dados Pessoais (ED/DPO)</td>
                                    <td>Serpro Educa</td>
                                    <td>01/01/2023</td>
                                    <td>
                                        <Button style={style} variant="success" size="sm"><i class="fas fa-share"></i> </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}