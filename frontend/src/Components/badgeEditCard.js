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



const badgeEditCard = (props) => {

  if (props.badge.type === "domain") {
    var className = "diagram-card-domain"
    var domain = true;
  }

  if (props.badge.type === "issuer") {
    var className = "diagram-card-issuer"
    var issuer = true;
  }

  if (props.badge.type === "class") {
    var className = "diagram-card-class"
    var classe = true;
  }


  return (
    <div className={className}>
      <button className="diagram-card-close-btn" onClick={props.handleCloseEdit}>
        <MdClose />
      </button>
      {domain === true &&
        <FormIssuer handleCloseAdd={props.handleCloseEdit}/>
      }
      {classe === true &&
        <FormBadge handleCloseAdd={props.handleCloseEdit}/>
      }

      {issuer === true &&
        <FormClass handleCloseAdd={props.handleCloseEdit}/>
      }
    </div>
  );
};

export default badgeEditCard;