import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Header from './Header';
import { Link } from "react-router-dom";
import OrganizationalChart from "./orgChart2";
import Footer from './Footer';
import badges from "./Data/data2";
import Api from '../Api';
import { useLocation } from 'react-router-dom'

export default function Diagram(props) {

  const location = useLocation()
  const [data, setData] = useState([ ]);

  const getData = async () => {
    var login = localStorage.getItem('login');
    var token = JSON.parse(login);

    console.log("issuer->", token.entity_id);

    let header = {
      headers: {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      }
    }
    const response = await Api.get('/graph/user/' + token.entity_id, header);
    console.log(response.data);

    setData(response.data);
  }  

  useEffect(() => {
    getData();
  }, []);

  const style = { width: '100px' };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Caminho de aprendizado</h1>
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