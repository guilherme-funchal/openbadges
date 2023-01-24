import React from "react";
import { MdClose } from "react-icons/md";
import "./Styles/styles.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { GrEdit }  from "react-icons/gr"

const badgeDetailsCard = (props, setModalShow) => {
  console.log(props);

  if (props.badge.type === "badge"){
    var badges = true;
  }

  if (props.badge.type === "issuer"){
    var issues = true;
  }

  if (props.badge.type === "class"){
    var classes = true;
  }

  return (
    <div className="diagram-card">
      <button className="diagram-card-close-btn" onClick={props.handleClose}>
        <MdClose />
      </button>

      {props.badge.team === "" ? (
        <div>
          <div className="diagram-card-header">
            {/* <img
              className="diagram-card-img"
              src={props.badge.imageUrl}
              alt="Profile"
            /> */}
            <h2 className="diagram-card-name">{props.badge.name}</h2>
            <p className="diagram-card-role">{props.badge.positionName}</p>
          </div>
          <div className="diagram-card-body">
            {/* {props.badge.type && (
              <div className="card-item">
                <p className="card-item-label">Tipo:</p>
                <p className="card-item-value">{props.badge.type}</p>
              </div>
            )} */}
            <div>
          {/* <button className="diagram-card-minus-btn" onClick={() => { props.handleClose(); props.handleShowDel();}}>
            <FaMinus />
          </button> */}
        </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="diagram-card-header">
            <h2 className="diagram-card-team-name">{props.badge.team} Team</h2>
          </div>
          <h4>Team Members:</h4>
          <div className="diagram-card-body">
            {props.badges
              .filter(
                (badge) => badge.parentId === props.badge.id.toString()
              )
              .map((badge) => (
                <div className="diagram-card-item-team" key={badge.id}>
                  {/* <img
                    className="diagram-card-item-img"
                    src={badge.imageUrl}
                    alt="Profile"
                  /> */}
                  <p className="diagram-card-item-name">{badge.name}</p>
                  <p className="diagram-card-item-role">{badge.positionName}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="diagram-card-item">
        <p className="diagram-card-item-label">Descrição:</p>
        <p className="diagram-card-item-value">{props.badge.description}</p>
      </div>
      {/* {props.badge.type === "badge" ? ( */}
      { badges === true &&
        <div className="diagram-card-item">
          <p className="diagram-card-item-label">Data de premiação:</p>
          <p className="diagram-card-item-value">{props.badge.date}</p>
          <button className="diagram-card-minus-btn" onClick={() => { props.handleClose(); props.handleShowDel();}}>
            <FaMinus />
            </button>  
        </div>
      }  
      {/* ) : ( */}
      { issues === true &&
        <div>
          <button className="diagram-card-plus-btn" onClick={() => { props.handleClose(); props.handleShowAdd();}}>
            <FaPlus />
          </button>
          <button className="diagram-card-edit-btn" onClick={() => { props.handleClose(); props.handleShowEdit();}}>
            <GrEdit />
          </button>
        </div>  
      }  
      { classes === true &&
        <div>
          <button className="diagram-card-plus-btn" onClick={() => { props.handleClose(); props.handleShowAdd();}}>
            <FaPlus />
          </button>
          <button className="diagram-card-minus-btn" onClick={() => { props.handleClose(); props.handleShowDel();}}>
            <FaMinus />
          </button>
          <button className="diagram-card-edit-btn" onClick={() => { props.handleClose(); props.handleShowEdit();}}>
            <GrEdit />
          </button>
        </div>  
      }                
    </div>
  );
};

export default badgeDetailsCard;