import React from "react";
import { MdClose } from "react-icons/md";
import "./Styles/styles.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { schemaBadge, uiSchemaBadge, formDataBadge } from "../Components/forms/badge";
import { schemaClass, uiSchemaClass, formDataClass } from "../Components/forms/class";
import Form from "react-jsonschema-form-bs4";

console.log("--->", formDataBadge);
console.log("--->", formDataClass)

const onSubmit = ({ formData }) => console.log("Dados", formData);

const badgeAddCard = (props) => {

console.log("props->", props);

if (props.type === "issuer"){
  var issuer = true;
}

if (props.type === "class"){
  var classe = true;
}

  return (
    <div className="diagram-card-issuer">
      <button className="diagram-card-close-btn" onClick={props.handleCloseAdd}>
        <MdClose />
      </button>
      { issuer === true &&  
        <Form
          schema={schemaClass}
          uiSchema={uiSchemaClass}
          formData={formDataClass}
          // onChange={}
          onSubmit={onSubmit}
        // onError={onError}
        >
          <div>
            <button className="btn btn-secondary mr-2" type="button" onClick={props.handleCloseAdd}>
              Cancelar
            </button>
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </div>
        </Form>
      }
      { classe === true &&
        <Form
          schema={schemaBadge}
          uiSchema={uiSchemaBadge}
          formData={formDataBadge}
          // onChange={}
          onSubmit={onSubmit}
        // onError={onError}
        >
          <div>
            <button className="btn btn-secondary mr-2" type="button" onClick={props.handleCloseAdd}>
              Cancelar
            </button>
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </div>
        </Form>
      }
    </div>
  );
};

export default badgeAddCard;