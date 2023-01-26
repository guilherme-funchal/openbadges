import React from "react";
import { MdClose } from "react-icons/md";
import "./Styles/styles.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
// import { schemaBadge, uiSchemaBadge, formDataBadge } from "../Components/forms/badge";
import { schemaClass, uiSchemaClass, formDataClass } from "../Components/forms/class";
import { schemaIssuer, uiSchemaIssuer, formDataIssuer } from "../Components/forms/issuer";
import Form from "react-jsonschema-form-bs4";
import FormBadge from "../Components/forms/badge"
import FormIssuer from "../Components/forms/issuer"
import FormClass from "../Components/forms/class"



const badgeAddCard = (props) => {

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
      <button className="diagram-card-close-btn" onClick={props.handleCloseAdd}>
        <MdClose />
      </button>
      {domain === true &&
        <FormIssuer />
      }
      {classe === true &&
        <FormBadge />
      }

      {issuer === true &&
        <FormClass />
      }
    </div>
  );
};

export default badgeAddCard;