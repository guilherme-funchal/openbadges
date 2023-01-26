export const schemaIssuer = {
    title: "Criar um emissor",
    type: "object",
    required: ["nome"],
    properties: {
      nome: {
        type: "string",
        default: "",
        title: "Nome",
        minLength: 1
      },
      description: {
        type: "string",
        default: "",
        title: "Descrição"
      },
      image: {
        type: "string",
        default: "",
        title: "Imagem"
      },
      staffId: {
        type: "string",
        default: "",
        title: "staffId"
      },
      email: {
        type: "string",
        default: "",
        title: "email"
      },
      url: {
        type: "string",
        default: "",
        title: "url"
      },
      domain: {
        type: "string",
        default: "",
        title: "domain"
      }
    }
  };
  
  export const uiSchemaIssuer = {
    "ui:rootFieldId": "formOne"
  };
  
  export const formDataIssuer = {};
  
  export default {
    schemaIssuer,
    uiSchemaIssuer,
    formDataIssuer
  };