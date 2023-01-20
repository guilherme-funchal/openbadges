import React from 'react';
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";


export default function CardBadges() {

    const style = { width: '110px' }

    return (
        <div className="container">

            <section className="content">
                <div className="card card-solid">
                    <div className="card-body pb-0">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                                <div className="card bg-light d-flex flex-fill">
                                    <div className="card-header text-muted border-bottom-0">
P01 - Encarregado de Dados Pessoais (ED/DPO)
                                    </div>
                                    <div className="card-body pt-0">
                                        <div className="row">
                                            <div className="col-7">
                                                <p className="text-muted text-sm"><b>SerproEduca</b></p>
                                                <ul className="ml-4 mb-0 fa-ul text-muted">
                                                    <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span></li>
                                                    <li className="small"><span className="fa-li"><i className="nav-icon far fa-calendar-alt" /></span>22/01/2022</li>
                                                </ul>
                                            </div>
                                            <div className="col-5 text-center">
                                                <img width="100" src="../../dist/img/emissor1.png"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="text-right">
                                        <div className="text-right">
                                        <Button style={style} variant="success" size="sm">Compartilhar</Button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                                <div className="card bg-light d-flex flex-fill">
                                    <div className="card-header text-muted border-bottom-0">
                                    P01 - Encarregado de Dados Pessoais
                                    </div>
                                    <div className="card-body pt-0">
                                        <div className="row">
                                            <div className="col-7">
                                                <p className="text-muted text-sm"><b>SerproEduca</b></p>
                                                <ul className="ml-4 mb-0 fa-ul text-muted">
                                                    <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span></li>
                                                    <li className="small"><span className="fa-li"><i className="fas fa-lg fa-calendar" /></span>22/01/2022</li>
                                                </ul>
                                            </div>
                                            <div className="col-5 text-center">
                                                <img width="100" src="../../dist/img/emissor2.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="text-right">
                                        <div className="text-right">
                                        <Button style={style} variant="success" size="sm">Compartilhar</Button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                                <div className="card bg-light d-flex flex-fill">
                                    <div className="card-header text-muted border-bottom-0">
                                     Membro do Núcleo Brasília da RBAC
                                    </div>
                                    <div className="card-body pt-0">
                                        <div className="row">
                                            <div className="col-7">
                                                <p className="text-muted text-sm"><b>RBAC</b></p>
                                                <ul className="ml-4 mb-0 fa-ul text-muted">
                                                <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span></li>
                                                    <li className="small"><span className="fa-li"><i className="fas fa-lg fa-calendar" /></span>22/01/2022</li>
                                                </ul>
                                            </div>
                                            <div className="col-5 text-center">
                                                <img width="100" src="../../dist/img/rbac.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="text-right">
                                        <Button style={style} variant="success" size="sm">Compartilhar</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <nav aria-label="Contacts Page Navigation">
                            <ul className="pagination justify-content-center m-0">
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                <li className="page-item"><a className="page-link" href="#">6</a></li>
                                <li className="page-item"><a className="page-link" href="#">7</a></li>
                                <li className="page-item"><a className="page-link" href="#">8</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>


            {/* <div class="card">
                <div>
                    <div className="card-header">
                        <h3 className="card-title">Grid</h3>
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
                    <div className="row">
                        <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                    
                        </div>
                    </div>
                    </div>
                </div> */}
        </div>
    )
}