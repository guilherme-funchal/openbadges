export const schemaBadge = {
    title: "Enviar um Badge",
    type: "object",
    required: ["nome"],
    properties: {
      // issuerId: {
      //   type: "string",
      //   default: "",
      //   title: "Emissor",
      //   minLength: 1
      // },
      // badgeclassId: {
      //   type: "string",
      //   default: "",
      //   title: "Classe do badge"
      // },
      recipientId: {
        type: "string",
        default: "",
        title: "Destinatário"
      },
      expires: {
        type: "string",
        default: "",
        title: "Expiração"
      }
    }
  };
  
  export const uiSchemaBadge = {
    "ui:rootFieldId": "formOne",
    recipientId: {
      classNames: "col-form-label-sm"
      // "ui:widget": "recipientId",
      // "ui:column": "xs6"
    },
    expires: {
      classNames: "col-form-label-sm"
      // "ui:widget": "classNames",
      // "ui:column": "xs6"
    }
  };
  
  export const formDataBadge = {};
  
  export default {
    schemaBadge,
    uiSchemaBadge,
    formDataBadge
  };