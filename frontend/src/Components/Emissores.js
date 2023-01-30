import Header from './Header';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';
import React, { useState } from "react";

import ReactDOM from "react-dom";
import Modal1 from "./Modals/addEmissor"
import Modal2 from "./Modals/editEmissor"


export default function Emissores() {

  const [showAddEmissor, setShowAddEmissor] = useState(false);
  const [showEditEmissor, setShowEditEmissor] = useState(false);
  
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const style = { width: '100px' }
  // const [modalIsOpen, setIsOpen] = React.useState(false);


  return (
    <div>
      <Header />
      <div className="container">
        <h1>Emissores</h1>
      </div>

      <div className="container">
        <Button style={style} variant="primary" size="sm" onClick={() => setShowAddEmissor(true)}>
            <i class="fas fa-plus"></i> Novo
        </Button>
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
                    <Link to="/Diagram">
                      <Button style={style} variant="success" size="sm"><i className="fas fa-sitemap"></i> Diagrama</Button>
                    </Link>
                    <Link to="/classes">
                      <Button style={style} variant="warning" size="sm"><i className="fas fa-th"></i> Classes</Button>
                    </Link>
                    <Button style={style} variant="danger" size="sm"><i className="fas fa-ban"></i> Excluir</Button>
                    <Button style={style} variant="primary" size="sm" onClick={() => setShowEditEmissor(true)}><i className="fas fa-check"></i> Editar</Button>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal1 title="My Modal1" name="teste" onClose={() => setShowAddEmissor(false)} show={showAddEmissor} />
      <Modal1 title="My Modal1" name="teste" onClose={() => setShowEditEmissor(false)} show={showEditEmissor} />
      <Footer />     
    </div>
  )
}