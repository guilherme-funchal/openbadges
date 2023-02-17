import Header from './Header';
import { useState, useEffect, useCallback } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from './Footer';
import Swal from 'sweetalert2';
import ReactDOM from "react-dom";
import Modal1 from "./Modals/addEmissor";
import Modal2 from "./Modals/editEmissor";
import Modal3 from "./Modals/viewEmissor";
import { useNavigate } from 'react-router-dom';
import Api from '../Api';

export default function Emissores() {

  const [showAddEmissor, setShowAddEmissor] = useState(false);
  const [showEditEmissor, setShowEditEmissor] = useState(false);
  const [showViewEmissor, setShowViewEmissor] = useState(false);
  const [issuers, setIssuers] = useState([]);
  const [items, setItems] = useState([' ']);
  const [id, setId] = useState([' ']);
  const [header, setHeader] = useState([]);
  const navigate = useNavigate();

  const getIssuer = async () => {
    var login = localStorage.getItem('login');
    var token = JSON.parse(login);

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      }
    }
    const response = await Api.get('issuer', config);
    setIssuers(response.data);
    setHeader(config);
  };


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


  async function editIssuer(id) {
    var response = await Api.get('issuer/' + id, header);
    setItems(response.data);
    setShowEditEmissor(true);
  }

  async function viewIssuer(id) {
    var response = await Api.get('issuer/' + id, header);
    setItems(response.data);
    setShowViewEmissor(true);
  }

  function delIssuer(id) {
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
        Api.delete('issuer/' + id, header);

        Toast.fire({
          icon: 'success',
          title: 'Emissor excluído'
        });
        getIssuer();
        navigate(0);
      }

    })
  }

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

  useEffect(() => {
    getIssuer();
  }, []);

  const style = { width: '100px' }

  var baseURL = process.env.REACT_APP_REST_HOST+ '/files/'

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
        <Link to="/DiagramDomain">
        <Button style={style} variant="success" size="sm"><i className="fas fa-sitemap"></i> Dominio</Button>
        </Link>
        {issuers.map((data) => {
          console.log("data:", data)
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
                          <h2 className="lead"><b>Descrição : </b>{data.description}</h2>
                          <h2 className="lead"><b>Email : </b>{data.badgrDomain}</h2>
                          <h2 className="lead"><b>URL : </b>{data.url}</h2>
                          <h2 className="lead"><b>Id : </b>{data.entityId}</h2>
                          <ul className="ml-4 mb-0 fa-ul text-muted">
                            <li className="small"><span className="fa-li"></span> Classes: 2</li>
                            <li className="small"><span className="fa-li"></span> Badges: 0</li>
                          </ul>
                        </div>
                        <div className="col-5 text-center">
                          <img src={baseURL + data.image} alt="image" className="img-circle img-fluid" />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="text-right">
                      <Button style={style} variant="secondary" size="sm" onClick={() => viewIssuer(data.id)}><i className="fas fa-eye" ></i> Detalhar</Button>
                      <Button style={style} variant="info" size="sm"><i className="fas fa-users" onClick=""></i> Staff</Button>
                        
                        <Link to="/classes" key={data.id} state={{ id: data.entityId }}>
                          <Button style={style} variant="warning" size="sm"><i className="fas fa-th"></i> Classes</Button>
                        </Link>
                        <Button style={style} variant="danger" size="sm" onClick={() => delIssuer(data.id)}><i className="fas fa-ban" ></i> Excluir</Button>
                        <Button style={style} variant="primary" size="sm" onClick={() => editIssuer(data.id)}><i className="fas fa-check"></i> Editar</Button>
                        <Link to="/DiagramIssuer" key={data.id} state={{ id: data.entityId }}>
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
      <Modal1 onClose={() => { setShowAddEmissor(false); getIssuer();} } show={showAddEmissor} header={header} />
      <Modal2 onClose={() => { setShowEditEmissor(false); getIssuer();} } show={showEditEmissor} header={header} items={items}/>
      <Modal3  onClose={() => setShowViewEmissor(false)} show={showViewEmissor} header={header} items={items}/>
      <Footer />
    </div>
  )
}