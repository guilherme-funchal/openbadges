import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import TableBadges from './table_badges';
import CardBadges from './card_badges';
import { Form, Button, Row, Col } from "react-bootstrap";
import Footer from './Footer';
import Api from '../Api';
import { getBadgeUtilityClass } from "@mui/material";

export default function Badges() {

    const getBadges = async (token) => {

        var headers = {
            'headers': {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          }
        const response = await Api.get('assertions', headers);
        
        console.log("badges->", response.data);

      };


    useEffect(() => {
        var login = localStorage.getItem('login');
        var token = JSON.parse(login);
        getBadges(token.access_token);


    }, [])

    const style = { width: '85px' }

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
                            <TableBadges />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="custom-tabs-five-normal" role="tabpanel" aria-labelledby="custom-tabs-five-normal-tab">
                            <CardBadges />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <Footer />  
            
        </div>
    )
}