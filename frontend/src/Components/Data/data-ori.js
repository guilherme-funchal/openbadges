const badges = [
    {
      id: 0,
      parentId: "",
      name: "Serpro",
      positionName: "Dominio",
      team: "",
      type: "domain",
      date: "",
      description:
        "Organização",
      imageUrl: "http://localhost:3000/dist/img/serpro.png",
    },
    {
      id: 1,
      parentId: "0",
      name: "Serpro Educa",
      positionName: "Emissor de badges",
      team: "",
      type: "issuer",
      date: "",
      description:
        "Certificações Profissionais SERPRO",
      imageUrl: "http://localhost:3000/dist/img/educa.png",
    },
    {
      id: 3,
      parentId: "1",
      name: "P01",
      positionName: "Encarregado de Dados Pessoais",
      team: "",
      type: "class",
      date: "",
      description:
        "P01 - Encarregado de Dados Pessoais (ED/DPO)",
      imageUrl: "http://localhost:3000/dist/img/emissor1.png",
    },
    {
      id: 4,
      parentId: "1",
      name: "P02",
      positionName: "Gestor de Dados Pessoais",
      team: "",
      type: "class",
      date: "",
      description:
        "P02 - Gestor de Dados Pessoais",
      imageUrl: "http://localhost:3000/dist/img/emissor2.png",
    },
    {
      id: 7,
      parentId: "3",
      name: "John Doe",
      positionName: "",
      team: "",
      type: "badge",
      date: "01/01/2023",
      description:
        "P02 - Gestor de Dados Pessoais",
      imageUrl: "http://localhost:3000/dist/img/user1-128x128.jpg",
    },
    {
      id: 6,
      parentId: "3",
      name: "Maria Silva",
      positionName: "",
      team: "",
      type: "badge",
      date: "01/01/2023",
      description:
        "P02 - Gestor de Dados Pessoais",
      imageUrl: "http://localhost:3000/dist/img/user5-128x128.jpg",
    }

  ];
  
  export default badges;
  