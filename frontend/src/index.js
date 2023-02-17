import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Administracao from './Components/Administracao';
import Badges from './Components/Badges';
import Home from './Components/Home';
import Emissores from './Components/Emissores';
import DiagramIssuer from './Components/Diagram-Issuer';
import DiagramClass from './Components/Diagram-Class';
import DiagramDomain from './Components/Diagram-Domain';
import Classes from './Components/Classes';
import Aprendizado from './Components/Aprendizado';
import Premiados from './Components/Premiados';
import Profile from './Components/Profile';
import Logoff from './Components/Logoff';
import Erro from './Components/Erro';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router key="router">
        <Routes key="routes">
          <Route key="/" path="/" element={<App />} />
          <Route key="/" path="/Home" element={<Home />} />
          <Route key="Administracao" path="/Administracao" element={<Administracao />} />
          <Route key="Badges" path="/Badges" element={<Badges />} />
          <Route key="Classes" path="/Classes" element={<Classes />} />
          <Route key="Emissores" path="/Emissores" element={<Emissores />} />
          <Route key="Diagramissuer" path="/DiagramIssuer" element={<DiagramIssuer />} />
          <Route key="Diagramclass" path="/DiagramClass" element={<DiagramClass />} />
          <Route key="Diagramdomain" path="/DiagramDomain" element={<DiagramDomain />} />
          <Route key="Aprendizado" path="/Aprendizado" element={<Aprendizado />} />
          <Route key="Premiados" path="/Premiados" element={<Premiados />} />
          <Route key="logoff" path="/logoff" element={<Logoff />}  />
          <Route key="Erro" path="/Erro" element={<Erro />}  />
          <Route key="Profile" path="/Profile" element={<Profile />}  />
        </Routes>
    </Router>
    
);


