import React from "react";
import { MdClose } from "react-icons/md";
import "./Styles/styles.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const badgeAddCard = (props) => {
  console.log(props);

  return (
    <div className="diagram-card-del">
      <button className="diagram-card-close-btn" onClick={props.handleCloseDel}>
        <MdClose />
      </button>
      Teste Del
     </div> 
  );
};

export default badgeAddCard;