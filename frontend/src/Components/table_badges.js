import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import { Form, Button, Row, Col } from "react-bootstrap";
import { IconName } from "react-icons/io";
import Api from '../Api';
import Modal1 from "./Modals/viewBadge";
import Modal2 from "./Modals/shareBadge";

export default function TableBadges(props) {
    const [viewBadge, setShowBadge] = useState(false);
    const [shareBadge, setShareBadge] = useState(false);
    const [assertion, setAssertion] = useState(false);

    const baseURL = process.env.REACT_APP_REST_HOST+ '/assertion/'
    const arr = [];

    const detailBadge = async (id) => {
        let result = id.replace(".png", "");
        console.log("Result->", result);
        result = result.replace("assertion-", "");
        console.log("Result->", result);
        setAssertion(result);
        setShowBadge(true);
    };

    const sharedBadge = async (id) => {
        console.log("id :", id);
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
                                                <Button style={props.style} variant="success" size="sm" onClick={() => sharedBadge(data.id)}><i className="fas fa-retweet"></i> </Button>
                                            </td>
                                            <td>
                                               <a href={baseURL + data.image} download>
                                                <Button style={props.style} variant="primary" size="sm"><i className="fas fa-share"></i> </Button>
                                               </a> 
                                            </td>
                                            <td>
                                                <Button style={props.style} variant="warning" size="sm"  onClick={() => detailBadge(data.image)}><i className="fas fa-eye"></i> </Button>
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
            <Modal1 onClose={() => { setShowBadge(false);} } show={viewBadge} assertion={assertion} props={props}/>
            <Modal2 onClose={() => { setShareBadge(false);} } show={shareBadge} />     
        </div>
       
    )
}