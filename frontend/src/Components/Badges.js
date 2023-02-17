import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import TableBadges from './table_badges';
import CardBadges from './card_badges';
import { Form, Button, Row, Col } from "react-bootstrap";
import Footer from './Footer';
import Api from '../Api';
import Modal from "./Modals/viewBadge";
// import { getBadgeUtilityClass } from "@mui/material";

export default function Badges() {

    const [assertions, setAssertions] = useState([' ']);
    const [classes, setClasses] = useState([' ']);
    const [issuers, setIssuers] = useState([' ']);
    const [header, setHeader] = useState([' ']);
    const [token, setToken] = useState("");

    const getIssuers = async (header) => {
        const response = await Api.get('issuer', header);
        setIssuers(response.data);
    };
    

    const getBadges = async (header, entityId) => {
        const response = await Api.get('assertions/user/' + entityId , header);
        setAssertions(response.data);
    };

    const getClasses = async (header) => {
        const response = await Api.get('badgeclass', header);
        setClasses(response.data);
    };

    useEffect(() => {
        var login = localStorage.getItem('login');
        var token = JSON.parse(login);
        var header = {
            'headers': {
                'Authorization': 'Bearer ' + token.access_token,
                'Content-Type': 'application/json'
            }
        }
        setToken(token.access_token);
        setHeader(header);
        getBadges(header,token.entity_id);
        getClasses(header);
        getIssuers(header);

    }, [])

    const style = { width: '35px' }

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Badges</h1>
            </div>
            <div className="container">
                <div className="card card-primary card-tabs">
                    <div className="card-header p-0 pt-1">
                        <ul className="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="custom-tabs-five-overlay-tab" data-toggle="pill" href="#custom-tabs-five-overlay" role="tab" aria-controls="custom-tabs-five-overlay" aria-selected="true"><i className="fas fa-table" /></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="custom-tabs-five-normal-tab" data-toggle="pill" href="#custom-tabs-five-normal" role="tab" aria-controls="custom-tabs-five-normal" aria-selected="false"><i className="fas fa-th" /></a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" id="custom-tabs-five-tabContent">
                            <div className="tab-pane fade active show" id="custom-tabs-five-overlay" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
                                <div className="overlay-wrapper">
                                    <TableBadges style={style} assertions={assertions} token={token} header={header} classes={classes} issuers={issuers}/>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="custom-tabs-five-normal" role="tabpanel" aria-labelledby="custom-tabs-five-normal-tab">
                                <CardBadges style={style} assertions={assertions} token={token} header={header} classes={classes} issuers={issuers}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}