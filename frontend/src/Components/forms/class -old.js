export const schemaClass = {
    title: "Criar uma classe",
    type: "object",
    required: ["nome"],
    properties: {
      // createdBy: {
      //   type: "string",
      //   default: "",
      //   title: "createdBy",
      //   minLength: 1
      // },
      // issuerId: {
      //   type: "string",
      //   default: "",
      //   title: "issuerId"
      // },
      name: {
        type: "string",
        default: "",
        title: "Nome"
      },
      image: {
        type: "string",
        default: "",
        title: "Imagem"
      },
      description: {
        type: "string",
        default: "",
        title: "Descrição"
      },
      criteriaUrl: {
        type: "string",
        default: "",
        title: "criteriaUrl"
      },
      criteriaNarrative: {
        type: "string",
        default: "",
        title: "Narrativa"
      },
      alignmentsTargetName: {
        type: "string",
        default: "",
        title: "Alinhamento"
      },
      alignmentsTargetUrl: {
        type: "string",
        default: "",
        title: "URL Alinhamento "
      },
      alignmentsTargetDescription: {
        type: "string",
        default: "",
        title: "Descrição"
      },
      alignmentsTargetFramework: {
        type: "string",
        default: "",
        title: "alinhamento Framework"
      },
      alignmentsTargetCode: {
        type: "string",
        default: "",
        title: "Código de alinhamento"
      },
      tags: {
        type: "string",
        default: "",
        title: "Etiqueta"
      },
      expiresAmount: {
        type: "string",
        default: "",
        title: "Data de expiração"
      },
      expiresDuration: {
        type: "string",
        default: "",
        title: "Tempo de expiração"
      }
    }
  };
  
  export const uiSchemaClass = {
    "ui:rootFieldId": "formOne"
  };
  
  export const formDataClass = {};
  
  export default {
    schemaClass,
    uiSchemaClass,
    formDataClass
  };