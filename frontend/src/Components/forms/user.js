export const schema = {
    title: "Nome do formulário",
    type: "object",
    required: ["nome"],
    properties: {
      userName: {
        type: "string",
        default: "",
        title: "Nome",
        minLength: 1
      },
      email: {
        type: "string",
        default: "",
        title: "email"
      },
      type: {
        type: "string",
        default: "",
        title: "tipo"
      },
      image: {
        type: "string",
        default: "",
        title: "Foto"
      },
      level: {
        type: "string",
        default: "",
        title: "perfil"
      },
      senha: {
        type: "string",
        default: "",
        title: "senha"
      },
      confirma_senha: {
        type: "string",
        default: "",
        title: "Confirma senha"
      }
    }
  };
  
  export const uiSchema = {
    "ui:rootFieldId": "formOne"
  };
  
  export const formData = {};
  
  export default {
    schema,
    uiSchema,
    formData
  };