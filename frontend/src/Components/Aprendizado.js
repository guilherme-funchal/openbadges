import React, { useState, useRef, useLayoutEffect } from "react";
import Header from './Header';
import { Link } from "react-router-dom";
import OrganizationalChart from "./orgChart2";
import Footer from './Footer';
import badges from "./Data/data2";

export default function Diagram() {

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
          <OrganizationalChart data={badges} />  
          {/* </div>
        </div> */}
      </div>
      <Footer />
    </div>
  )
}