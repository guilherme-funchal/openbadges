import React from "react";
import { MdClose } from "react-icons/md";
import "./Styles/styles.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
// import { schemaBadge, uiSchemaBadge, formDataBadge } from "../Components/forms/badge";
import { schemaClass, uiSchemaClass, formDataClass } from "./forms/class-add";
import { schemaIssuer, uiSchemaIssuer, formDataIssuer } from "./forms/issuer-add";
import Form from "react-jsonschema-form-bs4";
import FormBadge from "./forms/badge-add"
import FormIssuer from "./forms/issuer-add"
import FormClass from "./forms/class-add"
import Button from 'react-bootstrap/Button';


const badgeAddCard = (props) => {
  const style = { width: '93px' }
  console.log(props)
  return (
    <div className="diagram-card-issuer">
     <div className="row">
            <div className="text-center">
                <Button style={style} className="btn btn-default" variant="danger" size="sm" onClick={props.handleClose}>Cancelar</Button>
                <Button style={style} className="btn btn-default" variant="success" size="sm" >Enviar</Button>
            </div>
          </div>
    </div>
  );
};

export default badgeAddCard;