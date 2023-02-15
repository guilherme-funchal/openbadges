import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import Modal1 from "./Modals/viewBadge";
import Modal2 from "./Modals/shareBadge";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Api from '../Api';

export default function CardBadges(props) {
    const [viewBadge, setShowBadge] = useState(false);
    const [shareBadge, setShareBadge] = useState(false);
    const navigate = useNavigate();
    const [assertion, setAssertion] = useState(false);
    const [id, setId] = useState(" ");
    const [image, setImage] = useState(" ");
    const [items, setItems] = useState([' ']);
    const style = { width: '55px' }

    const baseURL = process.env.REACT_APP_REST_HOST + '/assertion/'


    const sharedBadge = async (id, image) => {
        console.log("image->", image);
        setImage(image);
        setId(id);
        setShareBadge(true);
    };


    const detailBadge = async (id) => {
        let result = id.replace(".png", "");
        result = result.replace("assertion-", "");
        const response = await Api.get('assertions/' + result, props.header);
        setItems(response.data);
        setShowBadge(true);
    };

    const delBadge = async (entityId) => {
        const result = await Api.delete('assertions/' + entityId, props.header);
        Toast.fire({
            icon: 'success',
            title: 'Badge excluído'
        });
        navigate(0);
    }

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

    const deleteBadge = async (id) => {

        let entityId = id.replace(".png", "");
        entityId = entityId.replace("assertion-", "");

        Swal.fire({
            title: 'Deseja excluir o badge?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                delBadge(entityId);
            }

        })
    }

    const arr = [];
    props.classes?.map((item, index) => {
        let obj = {}
        props.assertions.block?.filter((s, i) => {
            if (s.badgeClassId === item.entityId) {
                props.issuers?.filter((x, i) => {
                    if (item.issuerId === x.entityId) {
                        obj["name"] = item.name;
                        obj["classEntityId"] = item.entityId;
                        obj["badgeClassId"] = s.badgeClassId;
                        obj["description"] = item.description;
                        obj["criteriaUrl"] = item.criteriaUrl;
                        obj["createdBy"] = item.createdBy;
                        obj["criteriaNarrative"] = item.criteriaNarrative;
                        obj["classImage"] = item.image;
                        obj["tags"] = item.tags;
                        obj["issuerId"] = item.issuerId;
                        obj["issuerName"] = x.name;
                        obj["entityId"] = item.entityId;
                        obj["id"] = s.id;
                        obj["badge"] = s.badge;
                        obj["image"] = s.file;
                        obj["issueOn"] = s.issueOn;
                        obj["revoked"] = s.revoked;
                        obj["revocationReason"] = s.revocationReason;
                        arr.push(obj);
                    }
                })
            }
        })

    })


    return (
        <div className="container">

            <section className="content">
                <div className="card card-solid">
                    <div className="card-body pb-0">
                        <div className="row">

                            {/* <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
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
                            </div> */}

                            {
                                arr.map((data) => {

                                    return (
                                        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                                            <div className="card bg-light d-flex flex-fill">
                                                <div className="card-header text-muted border-bottom-0">
                                                    {data.name}
                                                </div>
                                                <div className="card-body pt-0">
                                                    <div className="row">
                                                        <div className="col-7">
                                                            <p className="text-muted text-sm"><b>{data.issuerName}</b></p>
                                                            <ul className="ml-4 mb-0 fa-ul text-muted">
                                                                <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span></li>
                                                                <li className="small"><span className="fa-li"><i className="fas fa-lg fa-calendar" /></span>{data.issueOn}</li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-5 text-center">
                                                            <img width="100" src={baseURL + data.image} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="text-right">
                                                        <td>
                                                            <Button style={props.style} variant="success" size="sm" onClick={() => sharedBadge(data.id, baseURL + data.image)}><i className="fas fa-retweet"></i> </Button>
                                                        </td>
                                                        <td>
                                                            <a href={baseURL + data.image} download>
                                                                <Button style={props.style} variant="primary" size="sm"><i className="fas fa-share"></i> </Button>
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <Button style={props.style} variant="warning" size="sm" onClick={() => detailBadge(data.image)}><i className="fas fa-eye"></i> </Button>
                                                        </td>
                                                        <td>
                                                            <Button style={props.style} variant="danger" size="sm" onClick={() => deleteBadge(data.image)}><i className="fas fa-ban"></i> </Button>
                                                        </td>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }

                        </div>
                    </div>
                    <div className="card-footer">
                    </div>
                </div>
            </section>
            <Modal1 onClose={() => { setShowBadge(false);} } show={viewBadge} assertion={assertion} items={items}/>
            <Modal2 onClose={() => { setShareBadge(false);} } show={shareBadge} id={id} image={image}/>
        </div>
    )
}