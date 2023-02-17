import React from 'react';
import Header from './Header';
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import Footer from './Footer';
import Api from '../Api';
import Swal from 'sweetalert2';
import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import ModalAddUser from './Modals/ModalAddUser';
import ModalEditUser from './Modals/ModalEditUser';

export default function Administracao() {

    const [users, setUsers] = useState([]);
    const [header, setHeader] = useState([]);
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const [showModalEditUser, setShowModalEditUser] = useState(false);
    const style = { width: '85px' }
    const [items, setItems] = useState([' ']);


    async function EditItemsUser(entity_id) {
        var response = await Api.get('users/' + entity_id, header);
        setItems(response.data);
    }

    async function editUser(entity_id) {
        console.log(entity_id);
        EditItemsUser(entity_id);
        setShowModalEditUser(true);
    }

    const getUsers = async () => {
        var login = localStorage.getItem('login');
        var token = JSON.parse(login);

        let config = {
            headers: {
                'Authorization': 'Bearer ' + token.access_token,
                'Content-Type': 'application/json'
            }
        }
        const response = await Api.get('users/', config);
        setUsers(response.data);
        setHeader(config);
    };

    const Sucesso = Swal.mixin({
        toast: true,
        position: 'center',
        iconColor: 'green',
        customclassName: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });

    const Falha = Swal.mixin({
        toast: true,
        position: 'center',
        iconColor: 'red',
        customclassName: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 4500,
        timerProgressBar: true
    });

    async function delUsuario(id) {
        Swal.fire({
            title: 'Deseja excluir a conta?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                Api.delete('users/' + id, header);
                Sucesso.fire({
                    icon: 'success',
                    title: 'Usuário excluído'
                });
            }
            getUsers();
            Navigate(0);
        })
    }

    async function changePassword(id) {


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

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Administração</h1>
                <Button style={style} variant="primary" size="sm" onClick={() => setShowModalAddUser(true)}>
                    <i class="fas fa-plus"></i> Novo
                </Button>
            </div>
            <div className="container">
                <div className="card">
                    <div>
                        <div className="card-header">
                            <h3 className="card-title">Lista de usuários</h3>
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{ width: 250 }}>
                                    {/* <input type="text" name="table_search" className="form-control float-right" placeholder="Busca" /> */}
                                    {/* <div className="input-group-append">
                                        <button type="submit" className="btn btn-default">
                                            <i className="fas fa-search" />
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="card-body table-responsive p-0">
                            <table className="blueTable">
                                <thead>
                                    <tr>
                                        <th class="bg-primary"><center>ID</center></th>
                                        <th class="bg-primary"><center>Nome</center></th>
                                        <th class="bg-primary"><center>Email</center></th>
                                        <th class="bg-primary"><center>Tipo</center></th>
                                        <th class="bg-primary"><center>Perfil</center></th>
                                        <th class="bg-primary"><center>Opção</center></th>
                                    </tr>
                                </thead>
                                {users.usuarios?.map((data) => {

                                    if (data.type === "pf") {
                                        var tp = "Pessoa física";
                                    } else if (data.type === "pj") {
                                        var tp = "Pessoa jurídica";
                                    }

                                    if (data.level === 0) {
                                        var prof = "Administrador";
                                    } else if (data.level === 1) {
                                        var prof = "Usuário";
                                    }

                                    return (
                                        <tr>
                                            <td style={{ cursor: "pointer" }} key={data.entity_id} onClick={() => editUser(data.entity_id)}><center>{data.entity_id}</center></td>
                                            <td style={{ cursor: "pointer" }} key={data.entity_id} onClick={() => editUser(data.entity_id)}><center>{data.username}</center></td>
                                            <td style={{ cursor: "pointer" }} key={data.entity_id} onClick={() => editUser(data.entity_id)}><center>{data.email}</center></td>
                                            <td style={{ cursor: "pointer" }} key={data.entity_id} onClick={() => editUser(data.entity_id)}><center>{tp}</center></td>
                                            <td style={{ cursor: "pointer" }} key={data.entity_id} onClick={() => editUser(data.entity_id)}><center>{prof}</center></td>
                                            <td>
                                                <center>
                                                    <Button style={style} variant="success" size="sm" onClick={() => changePassword(data.id)}><i className="fas fa-key" ></i> Senha</Button>
                                                    <Button style={style} variant="danger" size="sm" onClick={() => delUsuario(data.id)}><i className="fas fa-trash" ></i> Excluir</Button>
                                                    <Button style={style} variant="primary" size="sm" onClick={() => editUser(data.entity_id)}><i className="fas fa-pen"></i> Editar</Button>
                                                </center>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <ModalAddUser onClose={() => { getUsers(); setShowModalAddUser(false); setItems(' '); }} show={showModalAddUser} backdrop={"static"} keyboard={false} header={header} />
            <ModalEditUser onClose={() => { getUsers(); setShowModalEditUser(false); setItems(' '); }} show={showModalEditUser} backdrop={"static"} keyboard={false} header={header} items={items} />

            <Footer />
        </div>
    )
}