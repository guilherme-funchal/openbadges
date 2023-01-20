import React from 'react';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import { Link } from "react-router-dom";

export default function Header() {

  useEffect(() => {
  }, [])


  return (
    <nav className="main-header navbar navbar-expand-md navbar-dark bg-primary" >
      <div className="container">
        <a href="../../index3.html" className="navbar-brand">
        {/* <img src="" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        </img> */}
        </a>
        <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse order-3" id="navbarCollapse">
        <ul class="navbar-nav">
            <li className="nav-item">
            <Link to="/Badges" class="nav-link">
            <p>Badges</p>         
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/Emissores" class="nav-link">
            <p>Emissores</p>         
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/Aprendizado" class="nav-link">
            <p>Aprendizado</p>         
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/Administracao" class="nav-link">
            <p>Administração</p>         
            </Link>
            </li>
            
          </ul>
        </div>
        <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
              <i className="fa fa-user" />
            </a>
          </li>
        </ul>
        <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
              <i className="fa fa-unlock-alt" />
            </a>
          </li>
        </ul>
      </div>
    </nav>



  )
}
