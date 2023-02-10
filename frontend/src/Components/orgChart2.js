import React, { useState, useRef, useLayoutEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomNodeContent from "./customNodeContent";
import CustomExpandButton from "./customExpandButton";
import BadgeDetailsCard from "./badgeDetailsCard2";
import BadgeAddCard from "./badgeAddCard";
import BadgeDelCard from "./badgeDelCard";
import BadgeEditCard from "./badgeEditCard";
import Modal1 from "./Modals/Modal1";

const OrganizationalChart = (props) => {
  
  const [cardShow, setCardShow] = useState(false);
  const [cardShowAdd, setCardShowAdd] = useState(false);
  const [cardShowDel, setCardShowDel] = useState(false);
  const [cardShowEdit, setCardShowEdit] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const d3Container = useRef(null);

  const [badgeId, setBadgeId] = useState("");

  const handleShow = () => setCardShow(true);
  const handleClose = () => setCardShow(false);

  const handleShowAdd = () => setCardShowAdd(true);
  const handleCloseAdd = () => setCardShowAdd(false);

  const handleShowDel = () => setCardShowDel(true);
  const handleCloseDel = () => setCardShowDel(false);

  const handleShowEdit = () => setCardShowEdit(true);
  const handleCloseEdit = () => setCardShowEdit(false);

  const handleShowModal1 = () => setShowModal1(true);
  const handleCloseModal1 = () => setShowModal1(false);

  useLayoutEffect(() => {
  
    const toggleDetailsCard = (nodeId) => {
      handleShow();
      setBadgeId(nodeId);
    };
    const chart = new OrgChart();
    if (props.data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 300)
        .nodeHeight((d) => 140)
        .compactMarginBetween((d) => 80)
        .onNodeClick((d) => {
          toggleDetailsCard(d);
        })
        .buttonContent((node, state) => {
          return ReactDOMServer.renderToStaticMarkup(
            <CustomExpandButton {...node.node} />
          );
        })
        .nodeContent((d) => {
          return ReactDOMServer.renderToStaticMarkup(
            <CustomNodeContent {...d} />
          );
        })
        .render();
    }
  }, [props, props.data]);

  return (
    <div className="org-chart" ref={d3Container}>
      {cardShow && (
        <BadgeDetailsCard
          badges={props.data}
          badge={props.data.find((badge) => badge.id === badgeId)}
          handleClose={handleClose}
          handleCloseAdd={handleCloseAdd}
          handleShowAdd={handleShowAdd}
          handleCloseDel={handleCloseDel}
          handleShowDel={handleShowDel}
          handleCloseEdit={handleCloseEdit}
          handleShowEdit={handleShowEdit}
          handleCloseModal1={handleCloseModal1}
          handleShowModal1={handleShowModal1}
        />     
       )} 
       {cardShowAdd && (
        <BadgeAddCard
          badges={props.data}
          badge={props.data.find((badge) => badge.id === badgeId)}
          handleCloseAdd={handleCloseAdd}
        />     
       )} 
       {cardShowDel && (
        <BadgeDelCard
          badges={props.data}
          badge={props.data.find((badge) => badge.id === badgeId)}
          handleCloseDel={handleCloseDel}
        />     
       )} 
       {cardShowEdit && (
        <BadgeEditCard
          badges={props.data}
          badge={props.data.find((badge) => badge.id === badgeId)}
          handleCloseEdit={handleCloseEdit}
        />     
       )} 
       {showModal1 && (
        <Modal1
          badges={props.data}
          badge={props.data.find((badge) => badge.id === badgeId)}
          handleCloseModal1={handleCloseModal1}
          handleShowModal1={handleShowModal1}
        />     
       )} 
           
    </div>
  );
};

export default OrganizationalChart;
