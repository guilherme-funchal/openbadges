import React from 'react';
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';

export default function Emissores() {

  const style = { width: '85px' }

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Emissores</h1>
        <Button style={style} variant="success" size="sm"><i class="fas fa-plus"></i> Novo</Button>
      </div>
      
      <div className="container">
        <div className="card">
          <div className="card-header d-flex p-0">
            <h3 className="card-title p-3">Serpro Educa</h3>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane active" id="tab_1">
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-7">
                      <h2 className="lead"><b>Certificações Profissionais SERPRO</b></h2>

                      <ul className="ml-4 mb-0 fa-ul text-muted">
                        <li className="small"><span className="fa-li"></span> Classes: 2</li>
                        <li className="small"><span className="fa-li"></span> Badges: 10</li>
                      </ul>
                    </div>
                    <div className="col-5 text-center">
                      <img src="../../dist/img/educa.png" alt="user-avatar" className="img-circle img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="text-right">
                    <Link to="/classes">
                      <Button style={style} variant="warning" size="sm"><i class="fas fa-th"></i> Classes</Button>
                    </Link>
                    <Button style={style} variant="danger" size="sm"><i class="fas fa-ban"></i> Excluir</Button>
                    <Button style={style} variant="primary" size="sm"><i class="fas fa-check"></i> Editar</Button>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}