import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import { IconName } from "react-icons/io";
import Api from '../Api';
import Modal1 from "./Modals/viewBadge";
import Modal2 from "./Modals/shareBadge";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function TableBadges(props) {
    const [viewBadge, setShowBadge] = useState(false);
    const [items, setItems] = useState([' ']);
    const [shareBadge, setShareBadge] = useState(false);
    const [assertion, setAssertion] = useState(false);
    const [id, setId] = useState(" ");
    const [image, setImage] = useState(" ");
    const navigate = useNavigate();

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

    const baseURL = process.env.REACT_APP_REST_HOST+ '/assertion/'
    const arr = [];

    const detailBadge = async (id) => {
        console.log("aqui!!!!!");
        let result = id.replace(".png", "");
        result = result.replace("assertion-", "");
        console.log("result->", result);

        const response = await Api.get('assertions/list/' + result, props.header);

        setItems(response.data);

        console.log("------>", items);
        
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


    const sharedBadge = async (id, image) => {
        console.log("image->", image);
        setImage(image);
        setId(id);
        setShareBadge(true);
    };

    
    props.classes?.map((item, index) => {
        let obj = {}
        props.assertions.block?.filter((s,i) => {  
            if(s.badgeClassId === item.entityId){
                props.issuers?.filter((x,i) => {  
                    if(item.issuerId === x.entityId){
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
            <div className="card">
                <div>
                    <div className="card-header">
                        <h3 className="card-title">Tabela</h3>
                        <div className="card-tools">
                            <div className="input-group input-group-sm" style={{ width: 250 }}>

                            </div>
                        </div>
                    </div>
                    <div className="card-body table-responsive p-0">
                        <table className="table table-hover text-nowrap">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Nome</th>
                                    <th>Data</th>
                                    <th>Emissor</th>
                                    <th>Compartilhar</th>
                                    <th>Download</th>
                                    <th>Detalhar</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>

                            {
                            arr.map((data) => {

                            return (
                                        <tr>
                                            <td><img width="40" src={baseURL + data.image} /></td>
                                            <td>{data.name}</td>
                                            <td>{data.issueOn}</td>
                                            <td>{data.issuerName}</td>
                                            <td>
                                                <Button style={props.style} variant="success" size="sm" onClick={() => sharedBadge(data.id, baseURL + data.image)}><i className="fas fa-retweet"></i></Button>
                                            </td>
                                            <td>
                                               <a href={baseURL + data.image} download>
                                                <Button style={props.style} variant="primary" size="sm"><i className="fas fa-share"></i></Button>
                                               </a> 
                                            </td>
                                            <td>
                                                <Button style={props.style} variant="warning" size="sm"  onClick={() => detailBadge(data.image)}><i className="fas fa-eye"></i></Button>
                                            </td>
                                            <td>
                                                <Button style={props.style} variant="danger" size="sm"  onClick={() => deleteBadge(data.image)}><i className="fas fa-ban"></i></Button>
                                            </td>
                                        </tr>
                                    )

                                })
                            }
                            

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <Modal1 onClose={() => { setShowBadge(false);} } show={viewBadge} assertion={assertion} items={items}/>
            <Modal2 onClose={() => { setShareBadge(false);} } show={shareBadge} id={id} image={image}/>     
        </div>
       
    )
}