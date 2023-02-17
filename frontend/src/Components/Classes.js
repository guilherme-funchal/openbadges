import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';
import Modal1 from "./Modals/addClasse";
import Modal2 from "./Modals/addBadge";
import Modal3 from "./Modals/editClasse"
import { useLocation } from 'react-router-dom'
import Api from '../Api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Emissores(props) {

  const [showAddClasse, setShowAddClasse] = useState(false);
  const [showEditClasse, setShowEditClasse] = useState(false);
  const [classes, setClasses] = useState([]);
  const [showAddBadge, setShowAddBadge] = useState(false);
  const [header, setHeader] = useState([]);
  const [entityId, setEntityId] = useState('');
  const [issuerId, setIssuerId] = useState('');
  const [items, setItems] = useState([' ']);
  const location = useLocation()
  const baseURL = process.env.REACT_APP_REST_HOST + '/files/'
  const navigate = useNavigate();

  const style = { width: '110px' };
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'green',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });

  const getClasses = async () => {
    var login = localStorage.getItem('login');
    var token = JSON.parse(login);

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      }
    }
    const response = await Api.get('badgeclass/' + issuerId, config);
    setClasses(response.data);
    setHeader(config);
  };

  function sendBadge(id) {
    setEntityId(id);
    setShowAddBadge(true);
  }

  const editClasse = async (entityId) => {
    var response = await Api.get('badgeclass/' + entityId, header);
    setItems(response.data);
    setShowEditClasse(true);
  }  

  function delClass(id) {
    Swal.fire({
      title: 'Deseja excluir o emissor?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        Api.delete('badgeclass/' + id, header);

        Toast.fire({
          icon: 'success',
          title: 'classe excluída'
        });
        getClasses();
        navigate(0);
      }

    })
  }


  useEffect(() => {
    setIssuerId(location.state.id);
    getClasses();
  }, [])

  return (
    <div>
      <Header />
      <div className="container">

        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Classes</h1>
          </div>

          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to="/emissores">Emissores</Link></li>
              <li className="breadcrumb-item active">Classes</li>
            </ol>
          </div>
        </div>

      </div>
      <div className="container">
        <Button style={style} variant="primary" size="sm" onClick={() => setShowAddClasse(true)}>
          <i class="fas fa-plus"></i> Novo
        </Button>
        {classes.map((data) => {
          return(
            <div className="card">
              <div className="card-header d-flex p-0">
                <h3 className="card-title p-3">{data.name}</h3>
              </div>
              <div className="card-body">
                <div className="tab-content">
                  <div className="tab-pane active" id="tab_1">
                    <div className="card-body pt-0">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="lead"><b>Nome : </b>{data.name}</h2>
                          <h2 className="lead"><b>ID : </b>{data.entityId}</h2>
                          {/* <h2 className="lead"><b>Descrição : {data.criteriaNarrative}</b></h2> */}
                          <ul className="ml-4 mb-0 fa-ul text-muted">
                            <li className="small"><span className="fa-li"></span> Badges: 0</li>
                          </ul>
                        </div>
                        <div className="col-5 text-center">
                          <img src={baseURL + data.image} alt="image" className="img-fluid" />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="text-right">
                      <Link to="/Premiados" key={data.id} state={{ id: data.entityId}}>
                          <Button style={style} variant="info" size="sm"><i className="fas fa-users"></i> Premiados</Button>
                      </Link>
                      <Button style={style} variant="warning" size="sm" onClick={() => {sendBadge(data.entityId, data.issuerId);setShowAddBadge(true);}}><i className="fas fa-handshake"></i> Premiar</Button>
                      <Button style={style} variant="danger" size="sm" onClick={() => delClass(data.id)}><i className="fas fa-ban"></i> Excluir</Button>
                      <Button style={style} variant="primary" size="sm" onClick={() => editClasse(data.entityId)}><i className="fas fa-check"></i> Editar</Button>
                      <Link to="/DiagramClass" key={data.id} state={{ id: data.entityId }}>
                          <Button style={style} variant="success" size="sm"><i className="fas fa-sitemap"></i> Diagrama</Button>
                      </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )

        })}
        
      </div>
      <Modal1 name="teste" onClose={() => {setShowAddClasse(false); getClasses(); navigate(0);}} show={showAddClasse} entityId={issuerId}/>
      <Modal2 name="teste" onClose={() => {setShowAddBadge(false); getClasses(); navigate(0);}} show={showAddBadge} entityId={entityId} issuerId={issuerId} />
      <Modal3  name="teste" onClose={() => {setShowEditClasse(false); getClasses(); navigate(0);}} show={showEditClasse} items={items} header={header}/>
      <Footer />
    </div>
  )
}