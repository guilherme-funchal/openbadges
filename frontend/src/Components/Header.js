import React from 'react';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import { Link } from "react-router-dom";
import ModalEditUser from './Modals/ModalEditUser';

export default function Header() {

  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [items, setItems] = useState([' ']);
  const [header, setHeader] = useState([]);

  async function EditItemsUser(entity_id, token) {
    var header = {
      'headers': {
          'Authorization': 'Bearer ' + token.access_token,
          'Content-Type': 'application/json'
      }
    }
    setHeader(header);

    console.log("header", header);
    console.log("entity_id", entity_id);

    var response = await Api.get('users/' + entity_id, header);
    setItems(response.data);
  }

  async function editUser() {
    var login = localStorage.getItem('login');
    var token = JSON.parse(login);
    var entityId = token.entity_id;

    EditItemsUser(entityId, token);
    setShowModalEditUser(true);
  }

  useEffect(() => {
    const access_token = localStorage.getItem('login');
    setLogin(access_token);
  }, [])

  const Sucesso = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'green',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });

  const Falha = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'falha',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });

  const [error, setError] = useState('');
  const [login, setLogin] = useState('')
  const navigate = useNavigate();


  async function doLogout() {
    Swal.fire({
      title: 'Desaja sair da plataforma?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('login');
        navigate("/");
        navigate(0);

        Swal.fire({
          title: "Desconectado",
          text: "Faça o login novamente",
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          }
        })

      }
    })
  }
  
  async function changePassword() {

    var login = localStorage.getItem('login');
    var token = JSON.parse(login);
    var entityId = token.entity_id;
    var header = {
      'headers': {
          'Authorization': 'Bearer ' + token.access_token,
          'Content-Type': 'application/json'
      }
    }

    const response = await Api.get('users/' + entityId, header);
    var id = response.data.usuario.id;



    (async () => {

        const { value: formValues } = await Swal.fire({
            title: 'Trocar a senha',
            html:
                '<input type="password" id="senha1" class="swal2-input" placeholder="senha">' +
                '<input type="password" id="senha2" class="swal2-input" placeholder="confirmação">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('senha1').value,
                    document.getElementById('senha2').value
                ]
            }
        })

        if (formValues) {
            var senha1 = formValues[0];
            var senha2 = formValues[1];

            if  ( senha1 !== "") {

              if (senha1 === senha2) {
                  try {
                      var block = {
                          "password": senha1
                        }

                      var response = await Api.put('users/password/'+ id, block, header);

                      if (response.status === 200) {
                          await Sucesso.fire({
                              icon: 'success',
                              title: 'Senha atualizada'
                          })
                      }    
                  } catch (e) {
                      await Falha.fire({
                          icon: 'error',
                          title: 'Senha não foi alterada'
                      })
                  }
              } else {
                  await Falha.fire({
                      icon: 'error',
                      title: 'Senhas digitadas são diferentes!!!'
                  })
              }
            }  
        }



    })()

}

  async function doLogin() {
    setError('');

    (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Digite email e senha',
        html:
        '<input id="e-mail" class="swal2-input" placeholder="e-mail">' +
          '<input type="password" id="senha" class="swal2-input" placeholder="senha">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('e-mail').value,
            document.getElementById('senha').value
          ]
        }
      })

      if (formValues) {
        console.log(JSON.stringify(formValues))
        var email = formValues[0];
        var password = formValues[1];
        var block = {
          "email": email,
          "password": password
        }
        try {
          var response = await Api.post('user/login', block);

          if (response.status === 200) {
            localStorage.setItem('login', JSON.stringify(response.data));
            navigate("/Badges");
            navigate(0);

            await Sucesso.fire({
              icon: 'success',
              title: 'Usuário conectado'
            })

          }
        } catch (e) {
          await Falha.fire({
            icon: 'error',
            title: 'Senha ou usuário incorreto'
          })
        }


      }

    })()

  }



  return (
    <nav className="main-header navbar navbar-expand-md navbar-dark bg-primary" >
      <div className="container">
        <a href="../../index3.html" className="navbar-brand">
          {/* <img src="" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style="opacity: .8">
        </img> */}
        </a>
        <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse order-3" id="navbarCollapse">
         {
            !login
              ? (
                <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button" onClick={doLogin}>
                      <i className="fa fa-user" />
                    </a>
                  </li>
                </ul>
              ) : (
                <>
                  <ul className="navbar-nav">
                  {/* <li className="nav-item">
                      <Link to="/Profile" className="nav-link">
                        <p>Profile</p>
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link to="/Badges" className="nav-link">
                        <p>Badges</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Emissores" className="nav-link">
                        <p>Emissores</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Aprendizado" className="nav-link">
                        <p>Aprendizado</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Administracao" className="nav-link">
                        <p>Administração</p>
                      </Link>
                    </li>
                  </ul>
                  <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                  <li>  
                      <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button" onClick={editUser}>
                        <i className="fa fa-user" />
                      </a>
                    </li>
                  <li>  
                      <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button" onClick={changePassword}>
                        <i className="fa fa-key" />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button" onClick={doLogout}>
                        <i className="fa fa-unlock-alt" />
                      </a>
                    </li>
                  </ul>
                </>
              )
          }
        </div>



        <ModalEditUser onClose={() => { setShowModalEditUser(false); setItems(' '); }} show={showModalEditUser} backdrop={"static"} keyboard={false} items={items} header={header} type={"user"} />


      </div>
    </nav>



  )
}
