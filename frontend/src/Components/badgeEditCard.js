import React from "react";
import { MdClose } from "react-icons/md";
import "./Styles/styles.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const badgeAddCard = (props) => {
  console.log(props);

  return (
    <div className="diagram-card">
      <button className="diagram-card-close-btn" onClick={props.handleCloseEdit}>
        <MdClose />
      </button>
      Teste Edit
     </div> 
  );
};

export default badgeAddCard;