import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Header from './Header';
import { Link } from "react-router-dom";
import OrganizationalChart from "./orgChart";
import Footer from './Footer';
import badges from "./Data/data";
import { useLocation } from 'react-router-dom'
import Api from '../Api';

export default function Diagram(props) {
  const location = useLocation()
  const style = { width: '100px' };
  const arr = [];
  const [data, setData] = useState([ ]);
  const [domain, setDomain] = useState([ ]);

  const getData = async () => {
    var login = localStorage.getItem('login');
    var token = JSON.parse(login);
    setDomain(token.domain);

    let header = {
      headers: {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      }
    }
    const response = await Api.get('/graph/domain/' + token.domain, header);
    setData(response.data);
  }  

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Caminho de aprendizado Dominio {domain}</h1>
      </div>
      
      <div className="container">
        {/* <div className="card">
          <div className="card-body"> */}

          <OrganizationalChart data={data} /> 
          {/* </div>
        </div> */}
      </div>
      <Footer />
    </div>
  )
}